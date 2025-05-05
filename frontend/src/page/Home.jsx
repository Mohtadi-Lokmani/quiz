
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

      <Hero></Hero>
      <Work></Work>
      <Quiz></Quiz>
      <Create></Create>
      <Footer></Footer>
    </>
  )
}

export default Home