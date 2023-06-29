module Main (main) where

import Oak

import Counter as Ex

import Effect
import Prelude

main :: Effect Unit
main = do
  rootNode <- runApp Ex.app Nothing
  container <- getElementById "app"
  appendChildNode container rootNode
