module Counter where

-- this is the simplest example. the model is a single number that can be
-- incremented or decremented.

import Oak

import Prelude hiding (div)
import Effect

type Model = { number :: Int }

data Msg
  = Inc
  | Dec

view :: Model -> Html Msg
view model = div []
  [ div []
      [ button [ onClick Inc ] [ text "+" ]
      , text $ show model.number
      ]
  , div []
      [ button [ onClick Dec ] [ text "-" ]
      , text $ show model.number
      ]
  ]

next :: Msg -> Model -> (Msg -> Effect Unit) -> Effect Unit
next msg mod h = mempty

update :: Msg -> Model -> Model
update msg model = case msg of
  Inc -> model { number = model.number + 1 }
  Dec -> model { number = model.number - 1 }

init :: Model
init = { number: 0 }

app :: App Msg Model
app = createApp { init, view, update, next }

main :: Effect Unit
main = do
  rootNode <- runApp app Nothing
  container <- getElementById "app"
  appendChildNode container rootNode
