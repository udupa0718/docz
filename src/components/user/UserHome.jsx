import React, { useState, useEffect, useCallback, useContext} from "react"
import axios from "axios"
import { AuthContext } from "../../AuthContext/Context"
import { toast } from "react-toastify"

function UserHome() {
  const [files, setFiles] = useState([])
  const context = useContext(AuthContext)
  const token = context.token
  const currentUser = context.currentUser

  const readFiles = useCallback(() => {
      const getFiles = async () => {
          await axios.get(`/api/document/all`, {
              headers: {
                  Authorization: `${token}`
              }
          }).then (res => {
            let filterd = res.data.files.filter(item => item.user_id === currentUser._id)
            setFiles(res.data.files)
          }).catch(err => toast.error(err.response.data.msg))
      }
      getFiles()
  },[])

  useEffect(() => {
      readFiles()
  },[])
  

  if(files.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-secondary">No Files</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
       <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-primary">User Home</h3>
        </div>
       </div>
    </div>
  )
}

export default UserHome