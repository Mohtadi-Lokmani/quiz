
import './Home.css'
import Hero from '../components/Home/Hero'
import Work from '../components/Home/Work'
import Quiz from '../components/Home/quiz'
import Create from '../components/Home/Create'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
function Home() {
  
  return (
    <>

      <section id='a1'><Hero></Hero></section>
      <section id='a2'><Work></Work></section>
      <section id='a3'><Quiz></Quiz></section>
      <section id='a4'><Create></Create></section>
      <Footer></Footer>
    </>
  )
}

export default Home