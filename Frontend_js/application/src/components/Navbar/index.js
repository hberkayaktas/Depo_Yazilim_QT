import React from 'react'

function Navbar() {
      return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark text-reset" >
                  <div className="container-fluid">
                        <a className="navbar-brand text-light" href="#!">
                              <img src="./img/logo.png" alt="Logo" width={30} height={30} className="d-inline-block align-text-top rounded me-2" />
                              Coofie Time</a>
                        <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon text-light" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                          <a className="nav-link active" aria-current="page" href="#!">Home</a>
                                    </li>
                                    <li className="nav-item">
                                          <a className="nav-link" href="#!">-Çaylar</a>
                                    </li>
                                    <li className="nav-item">
                                          <a className="nav-link" href="#!">-</a>
                                    </li>
                                    
                              </ul>
                              <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                              </form>
                        </div>
                  </div>
            </nav>
    
  )
}

export default Navbar