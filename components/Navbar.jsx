import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
const Navbar = () => {
  return (
    <NavbarBs className='shadow-sm'>
        <Container>
            <Link className='me-auto' href="/" style={{cursor:"pointer"}} >
              <Image src="/line.ico" style={{cursor:"pointer"}} width={40} height={40} alt="Line Logo image" />
            </Link>
            <Nav >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/coins">Coins</Nav.Link>
                <Nav.Link href="/news">News</Nav.Link>
            </Nav>
        </Container>
    </NavbarBs>
  )
}

export default Navbar