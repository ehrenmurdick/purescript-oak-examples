module ManyCounters where

import Oak
import Counter as C

import Prelude hiding (div)
import Effect
import Data.Maybe
import Data.Array

type Model = Array Int

data Msg
  = Inc Int
  | Dec Int
  | Add

view :: Model -> Html Msg
view model =
  div []
    [ button [ onClick Add ] [ text "Add" ]
    , div [] (mapWithIndex showCounter model)
    ]

showCounter :: Int -> Int -> Html Msg
showCounter idx n = div []
  [ button [ onClick (Inc idx) ] [ text "Inc" ]
  , button [ onClick (Dec idx) ] [ text "Dec" ]
  , text $ show n
  ]

next :: Msg -> Model -> (Msg -> Effect Unit) -> Effect Unit
next msg mod h = mempty

update :: Msg -> Model -> Model
update msg model = case msg of
  Add -> 0 : model
  Inc i -> updateIndex i (_ + 1)
  Dec i -> updateIndex i (_ - 1)
  where
  updateIndex i f = fromMaybe model do
    prev <- index model i
    let next = f prev
    updateAt i next model

init :: Model
init = []

app :: App Msg Model
app = createApp { init, view, update, next }

main :: Effect Unit
main = do
  rootNode <- runApp app Nothing
  container <- getElementById "app"
  appendChildNode container rootNode
