import './ModalWithForm.css'
import { useEffect } from 'react';
import close from '../../assets/Close.svg';


const ModalWithForm = ({ title, buttonText, redirectText, handleTextButton, children, onClose, isOpen, onSubmit }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className={`modal ${isOpen && "modal_opened"}`} onClick={handleOverlayClose}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close-btn" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button_container">
            <button
              type="submit"
              className="modal__submit">
              {buttonText}
            </button>
            <button
              type="button"
              className="modal__text-button"
              onClick={handleTextButton}>
              {redirectText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default ModalWithForm;

