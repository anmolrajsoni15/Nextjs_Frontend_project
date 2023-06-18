const GradientWrapper = ({ children, ...props }) => (
    <div
        {...props}
        className={`relative flex items-center justify-center flex-col ${props.className || ""}`}>
        <div className={`absolute m-auto blur-[150px] ${props.wrapperClassName || ""}`}
            style={{
                background: '#D9D9D9',
            }}>

        </div>
        <div className="relative flex items-center justify-center">
            {children}
        </div>
    </div>
)

export default GradientWrapper