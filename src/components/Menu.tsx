import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;

  width: 100%;
  min-height: 50px;
  overflow: hidden;

  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.backgroundColors.card};
`
const MenuLink = styled(Link)<{$isActive: boolean}>`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  max-width: 300px;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: clamp(
    ${({theme}) => theme.fontSizes.small},
    3.5vw,
    ${({theme}) => theme.fontSizes.medium}
  );

  color: ${({theme, $isActive}) =>
    $isActive ? theme.textColors.primary : theme.textColors.secondary};
  cursor: ${({$isActive}) => ($isActive ? 'default' : 'pointer')};

  background-color: ${({theme, $isActive}) =>
    $isActive ? theme.backgroundColors.buttonHover : 'transparent'};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({theme}) => theme.backgroundColors.buttonHover};
    color: ${({theme}) => theme.textColors.primary};
    opacity: 0.9;
  }
`

const Menu = () => {
  const location = useLocation()

  const checkActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <Wrapper>
      <MenuLink $isActive={checkActive('/')} to="/">
        Calendar
      </MenuLink>
      <MenuLink $isActive={checkActive('/activities')} to="/activities">
        Activities
      </MenuLink>
    </Wrapper>
  )
}

export default Menu
