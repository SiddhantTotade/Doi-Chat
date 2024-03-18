import {useState, useEffect} from 'react';

import {useGlobal} from 'core/_index';
import {MessageBubbleMe, MessageBubbleFriend} from '../index';

export default function MessageBubble({index, message, friend}) {
  const [showTyping, setShowTyping] = useState(false);
  const messagesType = useGlobal(state => state.messagesType);

  useEffect(() => {
    if (index !== 0) return;
    if (messagesType === null) {
      setShowTyping(false);
      return;
    }
    setShowTyping(true);
    const check = setInterval(() => {
      const now = new Date();
      const ms = now - messagesType;
      if (ms > 10000) {
        setShowTyping(false);
      }
    }, 1000);

    return () => clearInterval(check);
  }, [messagesType]);

  if (index === 0) {
    if (showTyping) {
      return <MessageBubbleFriend friend={friend} typing={true} />;
    }
    return;
  }

  return message.is_me ? (
    <MessageBubbleMe text={message.text} created={message.created} />
  ) : (
    <MessageBubbleFriend
      text={message.text}
      created={message.created}
      friend={friend}
    />
  );
}
