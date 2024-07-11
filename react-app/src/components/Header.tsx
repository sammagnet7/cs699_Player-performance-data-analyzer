
interface HeaderProps {
    title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <>
            <div id='header' className="container-fluid text-center display-5 fw-medium" style={{ height: '4rem', color: '#fff' }}>{title}
            </div>
        </>
    )
}

export default Header