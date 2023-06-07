import React from "react"

const Footer = () => {
  return(
    <footer className="footer bg-base-200 p-10 text-base-content">
        <div>
          <img
            className="h-48 w-64"
            src="https://i.pinimg.com/originals/8a/9e/91/8a9e9112a2cf70b783ea4ef63a8d9e27.jpg"
          />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link-hover link">Branding</a>
          <a className="link-hover link">Design</a>
          <a className="link-hover link">Marketing</a>
          <a className="link-hover link">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <a className="link-hover link">Jobs</a>
          <a className="link-hover link">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </div>
      </footer>
  )
}

export default Footer