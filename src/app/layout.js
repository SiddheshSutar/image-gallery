import Script from 'next/script'
import Navbar from './components/Navbar'
import Content from './components/Content'
import './assets/scss/home.scss'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <head>
       <script async src="https://kit.fontawesome.com/2d9b67a497.js" crossOrigin="anonymous"></script>
       <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      </head>
      <body>
       <div className='body-wrapper'>
         <Navbar />
         <Content children={children} />
       </div>
      </body>
    </html>
  )
}
