import React from "react"
import {RecoilRoot} from "recoil"


export function Providers({children}) {
  return (
      <RecoilRoot>
        
          {children}
        
      </RecoilRoot>
  )
}