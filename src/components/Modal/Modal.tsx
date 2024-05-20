// import React, { useEffect } from 'react';
// import $ from 'jquery'; // assuming jQuery is installed and types for it are available


// interface ReusableModalProps {
//   show: boolean;
//   toggleModal: () => void; // assuming toggleModal is a function that takes no arguments
//   title: string;
//   children: React.ReactNode; // This type is for anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
// }

// const ReusableModal: React.FC<ReusableModalProps> = ({ show, toggleModal, title, children }) => {
//   // Effect to toggle the modal based on the `show` prop
//   useEffect(() => {
//     $('#reusableModal').modal(show ? 'show' : 'hide');
//   }, [show]);

//   return (
//     <div className="modal" tabIndex={-1} role="dialog" id="reusableModal">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{title}</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
//               <span aria-hidden="true">×</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             {children}
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={toggleModal}>Close</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReusableModal;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./Modal.scss";
interface ReusableModalProps {
  show: boolean;
  toggleModal: () => void; // assuming toggleModal is a function that takes no arguments
  title: string;
  is_title?:boolean;
  children: React.ReactNode; // This type is for anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
}
const ReusableModal: React.FC<ReusableModalProps> = ({ show, toggleModal, title, children ,is_title }) => {
  return (
    <Modal show={show} onHide={toggleModal} className='custom-modal-dialog'>
      <Modal.Header closeButton>
       {is_title && <Modal.Title className='dynamic-heading'>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>

    </Modal>
  );
};

export default ReusableModal;
