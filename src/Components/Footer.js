import React from "react"

const Footer = () => {
  return(
    <footer className="footer items-center p-4 bg-base-200">
      <div className="items-center grid-flow-col">
        <img className="h-12 w-12 rounded-lg" src="https://i.pinimg.com/originals/8a/9e/91/8a9e9112a2cf70b783ea4ef63a8d9e27.jpg" alt="logo" />
        <p>Copyright © 2023 - All right reserved</p>
      </div> 
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://www.linkedin.com/in/jeffchee86/"><img className="h-8 w-8 avatar rounded-lg opacity-70 hover:opacity-100 hover:scale-110" src="https://media.licdn.com/dms/image/D4E03AQFHhmuzadJ-IA/profile-displayphoto-shrink_200_200/0/1685372958148?e=1692230400&v=beta&t=DMb8QTHUs-9zuqv1kn8t1iYKxXP0bqXcJEGHtTzHQkg" alt="Jeffrey Chee" /></a>
        <a href="https://www.linkedin.com/in/julian-bombard/"><img className="h-8 w-8 avatar rounded-lg opacity-70 hover:opacity-100 hover:scale-110" src="https://media.licdn.com/dms/image/C4E03AQE2vxtDjubbHg/profile-displayphoto-shrink_200_200/0/1583358605195?e=1692230400&v=beta&t=c1FRaeIHcVVRwyhvyxlV7TMAC2QD2HxsPVAzUE6L7FQ" alt="Julian Bombard" /></a>
        <a href="https://www.linkedin.com/in/scottweaverdev/"><img className="h-8 w-8 avatar rounded-lg opacity-70 hover:opacity-100 hover:scale-110" src="https://media.licdn.com/dms/image/C5603AQHAdAdXeaUTvw/profile-displayphoto-shrink_200_200/0/1654194405341?e=1692230400&v=beta&t=66hRmZyHC-Pl_6YBhD0jaCkJrhbfUN1VQg5iDZHH9P4" alt="Scott Weaver" /></a>
        <a href="https://www.linkedin.com/in/calvin-driesner/"><img className="h-8 w-8 avatar rounded-lg opacity-70 hover:opacity-100 hover:scale-110" src="https://i0.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png?resize=300%2C300" alt="Calvin Dreisner" /></a>
      </div>
    </footer>
  )
}

export default Footer