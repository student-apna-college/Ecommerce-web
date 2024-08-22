import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
function Policy ()  {
  return (
    <Layout title={"Our Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Our Policy</h1>
          <p className="text-justify mt-2">
          Privacy Policy
LIC reserves its right to correct any part of the said content at any time as and when required at its sole discretion. The content of this website shall not be displayed or printed in any form in part or whole without the prior written approval of LIC.

The information contents provided on this site can not be copied, modified, uploaded, downloaded, published or republished, transmitted or otherwise distributed for commercial purposes without prior and explicit permission from LIC. Reproduction of any information or material provided on this website, with or without any modification, is prohibited unless, with prior permission of LIC, and shall amount to violation of copyright and would be deemed an illegal act.</p>

          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>

        </div>
      </div>
    </Layout>
  );
};

export default Policy