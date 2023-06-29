module GetAndParseJson where

import Control.MonadPlus (guard)
import Data.Array ((..))
import Data.Generic.Rep (class Generic)
import Data.Int (even)
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Aff (Aff, Error, never, runAff_)
import Effect.Class (liftEffect)
import Effect.Console (logShow)
import Fetch as F
import Oak
import Simple.JSON as JSON
import Oak.Html.Attribute (for, id_)

import Prelude
  ( Unit
  , discard
  , ($)
  , pure
  , class Show
  , (<>)
  , bind
  , map
  , mempty
  , show
  , (>>>)
  )

type Todo =
  { userId :: Int
  , id :: Int
  , title :: String
  , completed :: Boolean
  }

type User =
  { id :: Int
  , name :: String
  }

type Model =
  { message :: String
  }

data Msg
  = SetText String
  | GoGet
  | Got (Either Error User)

derive instance genericMsg :: Generic Msg _

instance showMsg :: Show Msg where
  show = genericShow

view :: Model -> Html Msg
view model = div []
  [ text model.message
  , div [] [ button [ onClick GoGet ] [ text "Perform GET" ] ]
  ]

getJson :: ∀ a. JSON.ReadForeign a => String -> Aff a
getJson url = do
  { text } <- F.fetch url {}
  json <- text
  case (JSON.readJSON json) of
    Right (t :: a) -> pure t
    Left e -> do
      logShow_ e
      never

logShow_ :: ∀ a. Show a => a -> Aff Unit
logShow_ = logShow >>> liftEffect

-- the `next` function receives the message and model and a continuation
-- function, and returns an Effect. this function is where an oak app performs
-- side effects. the continuation function, `Msg -> Effect Unit`, takes a
-- message and returns an effect that will perform that message in the context
-- of your app and update the dom. this continuation function is how the results
-- of the effects are sent back into the app. here we've used a special message
-- to deal with the result of running the Aff, `Got`. Check the definition of
-- `Msg` above to see how its defined.

-- notably, because we're using do syntax here, its pretty easy to use the
-- result of the first request when making the second request.
next :: Msg -> Model -> (Msg -> Effect Unit) -> Effect Unit
next GoGet _ continue = runAff_ (Got >>> continue) do
  (todo :: Todo) <- getJson "https://jsonplaceholder.typicode.com/todos/1"
  logShow_ todo.userId
  (user :: User) <-
    getJson
      ( "https://jsonplaceholder.typicode.com/users/" <> show
          todo.userId
      )
  pure user
next _ _ _ = mempty

update :: Msg -> Model -> Model
update msg model = case msg of
  SetText s -> model { message = s }
  GoGet -> model { message = "performing request!" }
  Got (Left _) -> model { message = "there was an error!" }
  Got (Right user) -> model
    { message = "the user that owns todo 1 is " <>
        user.name
    }

init :: Model
init = { message: "" }

app :: App Msg Model
app = createApp { init, view, update, next }

main :: Effect Unit
main = do
  rootNode <- runApp app Nothing
  container <- getElementById "app"
  appendChildNode container rootNode
