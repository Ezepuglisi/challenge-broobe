import React from 'react'
import '../css/modal.css'
import { useIssues } from '../contexts/IssuesContext'
import { toast } from 'react-toastify'

const ModalDelete = ({ setOpenModal, issueForDelete}) => {

    const { deleteIssue } = useIssues()

    const handleDelete = () => {

        deleteIssue(issueForDelete, toast, setOpenModal)

    }

    return (
        <div id="myModal" className="modal">

            <div className="modal-content">
                {/* <span  class="close" id="closeModalBtn">&times;</span> */}
                <p>¿Estas seguro que deseas eliminar {issueForDelete?.name}?</p>
                <div>
                    <button className='btn-eliminar' onClick={() => handleDelete()}>Si, eliminar</button>
                    <button className='btn-cancelar' onClick={() => setOpenModal(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete