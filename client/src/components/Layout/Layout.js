import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';
import {Toaster} from 'react-hot-toast';

 

 function Layout(Propes,children, title,description,keyword,author) {
  return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author}/>
                <title>{title}</title>
                
            </Helmet>
        <Header></Header>
        <main style={{minHeight:'75vh'}}>
          <Toaster></Toaster>
        {Propes.children}
        </main>
        <Footer></Footer>
        </>
  )
};

Layout.defaultProps = {
      title: 'Ecommerce app -- shop now',
      description:'mern stack project',
      author: 'Dev rawat'
}
export default Layout