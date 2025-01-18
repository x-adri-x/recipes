const Header = ({ children, isMobile }) => {
  return <div className={`min-h-24 flex justify-center items-center ${isMobile && 'min-h-16 w-full'}`}>{children}</div>
}

export default Header
