

const ToggleButton = ({ label, isActive, onClick }) => {
    return (
        <button onClick={onClick} className={`toggle-button ${isActive ? 'active' : ''}`}>
            {label}
        </button>
    );
};
export default ToggleButton;