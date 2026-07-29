function ChatHeader({ onNewChat }) {

  return (

    <header className="ai-header">

      <div className="ai-brand">

        <div className="ai-logo">
          🤖
        </div>


        <div className="ai-brand-text">

          <h1>
            Personal AI Assistant
          </h1>

          <span>
            Online • Groq AI
          </span>

        </div>

      </div>


      <button
        className="ai-new-chat"
        onClick={onNewChat}
      >

        + New Chat

      </button>


    </header>

  );

}


export default ChatHeader;