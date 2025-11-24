"use client"
// import Head from 'next/head'
import Script from "next/script";

export default function Page() {
  return (
    <>
      {/* <Head> */}
       <Script 
   src="http://localhost:3001/widget/widget.js" 
   data-widget-id="widget_1763900871379"
   data-business-name="My Business"
   data-welcome-message="Hello! How can I assist you?"
   data-color="#F2994A"
   data-position="right"
   data-shape="round"
   async
>
</Script>
      {/* </Head> */}

      <main>
        <h1>Hello World</h1>
      </main>
    </>
  )
}
