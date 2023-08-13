import React from "react";

const DPPpage = () => {
  return (
    <div className="w-full h-full px-10 md:px-40 lg:px-64 text-[#FFFFFFCC] bg-[#121212]">
      <div className="flex flex-col py-24 gap-3 items-center justify-center">
        <div className="text-center text-[#28A1FF] font-inter text-base font-semibold">
          Current as of 5 July, 2023
        </div>
        <div className="text-center font-inter font-semibold text-5xl">
          Data & Privacy Policy
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="text-[#A1A1AA] font-inter text-xl leading-[30px] font-normal">
          At Bloc.AI, we value the privacy and security of our user&apos;s data.
          This Data and Privacy Policy outlines how we collect, use, and protect
          the information you provide to us. By using the Bloc.AI platform, you
          agree to the terms and practices described in this policy.
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            1. What information do we collect?
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We collect information that is necessary for the proper functioning
            of our platform and to provide you with the best possible user
            experience. This may include personal information such as your name,
            email address, and other contact details. We also collect data
            generated through your interactions with the platform, including
            questions asked, user preferences, and usage patterns.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            2. How do we use this information?
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We use the collected data for following purposes:
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            <ul className="list-disc pl-8">
              <li>
                To personalize your experience and provide relevant content and
                suggestions.
              </li>
              <li>
                To improve our platform&apos;s functionality, features, and
                performance.
              </li>
              <li>
                To analyze user behavior and trends to enhance the overall user
                experience.
              </li>
              <li>
                To communicate with you regarding updates, new features, and
                important announcements.
              </li>
              <li>
                To address any inquiries, support requests, or feedback you may
                have.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            3. What is our Data Sharing policy?
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We do not share your personal information with third parties unless
            it is necessary for the operation of our platform or required by
            law. In such cases, we ensure that appropriate safeguards are in
            place to protect your data.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            4. How do we ensure security of your data?
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We implement industry-standard security measures to protect your
            information from unauthorized access, loss, or alteration. This
            includes encryption, firewalls, secure data storage, and regular
            system monitoring. However, please note that no method of data
            transmission over the internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            5. How do we retain your data?
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We retain your personal information only for as long as necessary to
            fulfils the purposes outlined in this policy. If you request the
            deletion of your data or terminate your account, we will securely
            delete or anonymise your information, subject to any legal
            obligations.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            6. Do we use Cookies and tracking Technologies?
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We may use cookies and similar tracking technologies to enhance your
            browsing experience and collect usage information. You can control
            the use of cookies through your browser settings, but please note
            that disabling cookies may affect certain features of our platform.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="font-inter text-3xl leading-[38px] font-semibold">
            7. Updates to the Privacy Policy:
          </div>
          <div className="font-inter text-lg font-normal text-[#A1A1AA]">
            We may update this policy to reflect changes in our practices or
            legal requirements. Please review this policy periodically. Your
            continued use of the Bloc.AI platform signifies your acceptance of
            the updated policy.
          </div>
        </div>
      </div>
      <div className="font-inter text-lg font-normal text-[#A1A1AA] flex flex-col gap-5 mt-16">
        <div className="">Thank you for choosing Bloc.AI.</div>
        <div className="">
        If you have any questions, concerns, or requests regarding your data or privacy, please contact us at nitya@mysticlabs.ai.
        </div>
      </div>
    </div>
  );
};

export default DPPpage;
