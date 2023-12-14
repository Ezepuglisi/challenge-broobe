import React, { useEffect, useState } from 'react'
import { useIssues } from '../contexts/IssuesContext'
import Loader from '../components/Loader'
import Menu from '../components/Menu'
import { Link, useNavigate } from 'react-router-dom'
import '../css/issues.css'
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalDelete from '../components/ModalDelete'
import { ToastContainer } from 'react-toastify'

const IssuesList = () => {

  const { getIssues, getPriorities, priorities, issues } = useIssues()
  const [loadingIssuesList, setLoadingIssuesList] = useState(false)
  const [errorIssuesList, setErrorIssuesList] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [issueForDelete, setIssueForDelete] = useState({})
  const navigate = useNavigate()



  useEffect(() => {
    if(!issues || issues.length == 0) {
      setLoadingIssuesList(true)
      getIssues(setLoadingIssuesList, setErrorIssuesList)
    }
  }, [])

  useEffect(() => {
    console.log(issues)
  },[])

  return (
    <>
      <section className='section-container'>
        {/* <Navbar /> */}
        <Menu />
        {(!issues || priorities.length == 0 || loadingIssuesList) && <div className='loader-container'><Loader /></div>}



        {issues && issues.length > 0 && priorities.length > 0 && (
          <div className='issues-container'>
            {issues.map((issue, index) => {
              return (
                <div className={`issue priority${issue.priority_id}`} key={index}>
                  <div>
                    <h4>{issue.name}</h4>
                    <p>{issue.description}</p>
                    {priorities.map((p, i) => {
                      if (p.id === issue.priority_id) return (<p key={i} className='priority-p'>Status: <span style={{ color: 'rgb(65, 65, 109)', fontWeight: '600' }} >{p.type}</span></p>)
                    })}
                  </div>
                  <div>
                    <LiaEdit onClick={() => navigate(`/updateIssue/${issue.id}`)} size={'25px'} />
                    <RiDeleteBin5Line onClick={() => { setOpenModal(true), setIssueForDelete(issue) }} size={'25px'} />
                  </div>
                </div>
              )
            })}

            <Link className='btn-createnewissue' to={'/createIssue'}>Agregar un nuevo issue +</Link>


          </div>
        )}

        {issues && issues.length === 0 && (
          <div className='no-issues'>
            <h3>No tienes issues Creados</h3>
            <p>Comienza a hacerlo para organizar mejor tu día 😀</p>
            <Link className='btn-createnewissue' to={'/createIssue'}>Crear un nuevo Issue</Link>
          </div>
        )}

        {openModal && <ModalDelete setOpenModal={setOpenModal} issueForDelete={issueForDelete} />}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>
    </>

  )
}

export default IssuesList