//  src/contexts/message.context.tsx
import { message as messageFacade } from 'antd';
import { createContext, useContext } from 'react';
import type { TChildrenComponent } from '../types/base.types';
import type { MessageInstance } from 'antd/es/message/interface';

// Context //
type TMessage = MessageInstance; // ReturnType<typeof messageFacade.useMessage>[0];

const MessageContext = createContext<TMessage | null>(null);

// Provider //

export const MessageContextProvider = ({ children }: TChildrenComponent) => {
  const [message, holder] = messageFacade.useMessage();

  return (
    <MessageContext.Provider value={message}>
      {holder}
      {children}
    </MessageContext.Provider>
  );
};

// Hook //

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessageContext must be within MessageContextProvider');
  return context;
};
