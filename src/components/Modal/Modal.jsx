import s from "./Modal.module.scss";

export const Modal = ({children, isModalOpen, type, isLightMode}) => {

  const closeModal = () => {
    isModalOpen(prev => !prev);
  }
    
  return (
    <>
      <div className={`${!isModalOpen ? s.overlayStyling : ''}`}></div>
      <div className={`${!isModalOpen ? s.modalStyling : ''} ${s[type]} ${!isLightMode ? s.lightMode : ''}`}>
        <button onClick={() => closeModal()}>X</button>
        {children}
        </div>
    </>
  )
}