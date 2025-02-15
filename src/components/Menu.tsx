import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: 1200px;
  
  width: 100%;
  min-height: 75px;

  align-items: center;
`
const MenuLink = styled(Link)`
  all: unset;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px 15px;
`

const Menu = () => {
  return (
    <Wrapper>
      <MenuLink to="/">Home</MenuLink>
      <MenuLink to="/activities">Activities</MenuLink>
      <MenuLink to="/goals">Goals</MenuLink>
      <MenuLink to="/profile">Profile</MenuLink>
    </Wrapper>
  )
}

export default Menu