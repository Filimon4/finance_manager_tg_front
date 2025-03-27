import StyledBaseContainer from "@shared/components/containers/StyledBaseContainer/StyledBaseComponent"
import { IStyledBaseContainer } from "@shared/types/Containers"
import React, { FC } from "react"

interface MoneyInfoProps extends IStyledBaseContainer {
    children: React.ReactNode
}

const MoneyInfo: FC<MoneyInfoProps> = ({style, children}) => {
  return (
    <StyledBaseContainer style={style}>
        {children}
    </StyledBaseContainer>
  )
}

export default MoneyInfo
