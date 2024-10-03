const ChatWindow = ({ currentSection, additionalState }) => {
    return (
        <div className="floating-window">
            <h1>Current Section: {currentSection}</h1>
            <h2>Additional State: {additionalState}</h2>
        </div>
    );
};

export default ChatWindow;
