import './index.scss'

const Background = () => {
  return (
    <div className="clash-bg">
        <div className="clash-left"></div>
        <svg
            className="zigzag-divider"
            width="20"
            height="100%"
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M 0 0 L 20 10 L 0 20 L 20 30 L 0 40 L 20 50 L 0 60 L 20 70 L 0 80 L 20 90 L 0 100"
                stroke="white"
                strokeWidth="4"
                fill="none"
            />
        </svg>
        <div className="clash-right"></div>
    </div>
  )
}

export default Background