import { IoMdClose as Close } from 'react-icons/io';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  show: boolean;
  onClose?: () => void;
}

const Modal = ({ children, onClose, show, className, ...props }: ModalProps) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${!show && 'hidden' }`}>
      <div className="fixed inset-0 bg-black opacity-30 z-10" onClick={onClose}></div>
      <div
        className={`relative bg-white rounded-lg shadow-lg z-20 ${className}`}
        {...props}
      >
        <button onClick={onClose} className="z-30 p-2 rounded-full text-purple-950 absolute top-1 right-1">
          <Close className="w-7 h-7" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;