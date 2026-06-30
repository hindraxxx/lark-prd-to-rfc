# Digisign 4W - Spouse Signing

Source: https://gotocompany.sg.larksuite.com/wiki/XIPawZ3hAir175kM6YYltsW7gLf

## Background
<title>Digisign 4W - Spouse Signing</title>

# Digisign 4W - Spouse Signing

Allow 4W borrower to do digisign for LBA signing + Allow spouse signing to support 4W loan application

**Author:** [**Antoni Santoso**](mailto:antoni.santoso@findaya.co.id)

**One pager from BFI:** [**[VF One Pager] Spouse Digital Signature for 4W**](https://docs.google.com/document/d/157SoVJ-tgLsH6xmattLnp2pLLWG4HNpO5XUIrnMgY1g/edit?tab=t.0#heading=h.ugacrwhb8ubq)



---



### Background

Currently, we run Digisign only for 2W borrowers due to a limitation: for 4W borrowers, spouse signing is required if the user is married. Without Digisign, 4W borrowers must go through a manual signing process, which is not seamless. According to the data from the one-pager shared by BFI, Digisign has made the signing process more efficient, with approximately 60% of users completing the signing within 30 minutes of the LBA being generated.

Another reason for implementing Digisign for 4W signing is that it has become a prerequisite for 4W top-ups, as the BFI compliance team requires spouse signing. Therefore, this feature also unlocks an additional revenue stream—4W top-ups. This will be valuable in the coming months, as the pool of users eligible for 4W top-ups has always been growing

### Metrics

- Digisign funnel conversion for 4w

  - Funnel for borrower
  - Funnel for spouse
- Time it takes for borrower to complete the LBA signing (including spouse signing)

  - Time it takes for borrower to complete LBA
  - Time it takes for spouse to complete LBA
  - TIme difference between borrower and spouse signing
- Time it takes for BFI to generate LBA for both spouse and borrower

### Target User

- 4W, All user group



#### Estimated User:

![](https://feishu.cn/file/LUqIbOkrxoKFgKx2jgYlcyW8gTd)

**95%++ of spouse phone numbers have gopay / gojek account.**



![](https://feishu.cn/file/I8PKbMTimo9d7jxp98RligGYg7f)

**29.7% of spouse phone numbers that have gopay / gojek account is already kyc_gopay_approved**

- 5% is kyc rejected
- Monthly estimated user (spouse) who will require kyc is 292 user / month

### Design

[WIP] Link to design: [Figma](https://www.figma.com/design/BnPCrmQWtOshIIjAYn7q7I/Pinjam-BPKB-MAB-BFI?node-id=29190-7539&p=f&t=T7WVYRdAbK0ggShk-0)

JOB TO BE DONE BY DESIGNER TEAM - ‼️ ONLY READ THIS SECTION FOR DESIGNER:



1. As a borrower i want to be able to know that spouse signing is required

   1. I want to be able to see spouse sign status. Spouse sign status should be:
   
      1. Expired
      2. To Do
      3. Signed
2. As a borrower, i want to know precisely what will be shown in my spouse app, so that i will be able to guide him / her successfully



1. As spouse, After clicking vf entrypoint, there will be a popup / screen where user sees a notice that they sign is required for his / her spouse

   1. Spouse need to be able to see borrower name (use \*\*\*\* as the hash, e.g. a\*\*\*i s\*\*\*o
   2. Spouse need to be able to see loan expiry time



1. As spouse, i will be able to see floating action button that requires my attention if i close the popup / screen in the 2nd step

   1. If its clicked, it will redirect me to the digisign page



DESIGN MOCK:

![](https://feishu.cn/file/Asyeb2aYiovk2wxlZlelu9bZgmd)





### Flowchart

Updated Flow Chart 25082025:

[https://drive.google.com/file/d/1Dz1ZOaC8_tFwfhdeZpYv4lU0zVCMbsg-/view](https://drive.google.com/file/d/1Dz1ZOaC8_tFwfhdeZpYv4lU0zVCMbsg-/view)



### Requirement (scope: 4W)

#### #1 As MAB, I want to be able to receive final spouse data + spouse LBA in the digisign process from BFI, so that I will be able to use that data for spouse digisign process

1. BFI will send the spouse information on approved callback if spouse signing is required

   1. Spouse information to be shared by bfi:
   
      1. Spouse full name
      2. Spouse phone number
      3. Spouse e-ktp number
      4. Spouse date of birth
      5. Spouse place of birth
2. If bfi does not send the spouse signing data, then we can assume that spouse signing is not required
3. ~~BFI will be able to re-hit the approved callback to re-update the spouse signing data (in case spouse data need to be changed by BFI)~~

#### #2 As a spouse I want to be able to see the LBA signing entrypoint so that i could sign the LBA to help my spouse get the loan

1. Spouse will be whitelisted automatically for vehicle financing. (based on the phone number that BFI shared on approved callback)
2. Everytime spouse open vf app, show spouse signing bottom sheet

![](https://feishu.cn/file/MlDEbvqpVofLz3xRbCxlZvccg2b)

1. When bottom sheet spouse signing is closed, then on every page in vf, there will be floating action button. Where if the floating action button is clicked, it will trigger the bottom sheet for spouse signing

   1. Floating action button will be movable by the user to the whole screen



1. There’ll be push notification and whatsapp to remind spouse to do signing:

   1. Reminder when spouse signing is required (send this when we got the spouse data from approved callback):
   
      1. **PN**
      
         1. **Title:** Tandatangan Dulu, Baru Cair!
         2. **Subtitle:** Yuk tandatangan, biar pinjaman pasangan kamu di GoPay Pinjam BPKB bisa cair
      2. **WA**
      
         1. **Content:** TBD
         2. **CTA deeplink:** TBD
   2. Daily reminder for spouse signing starting from D+1 on 10 am from getting approved callback
   
      1. **PN**
      
         1. **Title:** Kamu ditungguin pasangan kamu nih...
         2. **Subtitle:** Pinjaman di GoPay Pinjam BPKB gak bisa cair kalo kamu gak tanda tangan
      2. **WA**
      
         1. **Content:** TBD
         2. **CTA deeplink:** TBD



1. Corner Cases - TBD: In situations where BFI assigns one person as the spouse of multiple individuals, the spouse will encounter the entry points in FIFO (first-in, first-out) order.

#### #3 As MAB, I want to be able to call KYC SDK for spouse signing, so that I will be able to validate the user



1. When spouse click on the spouse signing entrypoint, then call one kyc sdk. One kyc dk will determine for the kyc process (whether it is progressive or non progressive; whether kyc is required or not for existing user, etc)
2. Once one kyc sdk passed; then user will be able to access lba
3. If one kyc sdk not passed, then user will see the same bottom sheet as when they click on the entrypoint

![](https://feishu.cn/file/IpBXbEHoXozmv1xCKejlgM0Ogmc)





#### #4 As a borrower, I want to be able to track down digisign status from my spouse, so that I will be able to follow up to my spouse in case they haven’t sign the document yet



1. On the borrower page, borrower will be able to see the spouse signing status.

   1. Spouse signing status will be: signed and not signed
   2. Show the expiry date as well
   3. Show spouse name and phone number
2. Learn more cta is to direct user to the help center article

![](https://feishu.cn/file/ToGTbcm1To87hQx4be0lDvWigpg)



1. Both spouse and borrower signing is required for user to move on to the current loan processing page

![](https://feishu.cn/file/EQrTbsbVdowUSJxJn4elMUbGgib)





### User Flow

1. User submit an application
2. User got pre-approved
3. User create schedule
4. User check in to the appointment
5. VD to validate the spouse information that is earlier filled by borrower in the spouse information page
6. BFI trigger approval + generate LBA for borrower and spouse + share spouse data post verified by VD
7. Borrower open vf app and click on digisign

   1. Borrower sign lba
   2. Borrower will be able to see spouse signing status
8. Spouse will see an entrypoint to sign LBA in vf
9. Spouse do kyc
10. Digisign is previewed and spouse sign on LBA
11. Signing process is completed
12. Go live
13. Disbursed



### Go to market strategy

1. Percentage rollout to merchant user group + driver user group
2. If there's no issue on step 1, then move to consumer user group

### Data Tracking

TBF



### Question List

1. **Is there any concern from bfi to trigger spouse signing in parallel with borrower signing?**  
\>>>> Can be in parallel



1. **Edge Case: How will we handle 1 spouse that is correlated to more than 1 borrower?**  
\>>>> its fine, MAB will just listen to data that BFI shared
2. **Edge Case: How will we handle 2 spouses that are correlated to 1 borrower?**  
\>>>> BFI will only share 1 spouse  
\>>>> There will not be a spouse data changes once the spouse data passed to MAB. It will be a limitation for the current scope



1. **[Exploration phases] can the spouse sign from the borrower app?**

> no, due to regulatory issue



1. **If the spouse get kyc blocked response, then what will be done?**

Wet Sign (outside of the app)  
[to propose to bfi] >>>> wet sign bareng sama borrower nya sekalian juga aja deh skalian.  
[to ask goto and bfi] Can Spouse do KYC in Gopay app during the survey?

1. During the spouse signing, does certificate for signing is required or gopay plus creation is also required?
2. **Who will do the kyc, DAB / SNI?**
3. **What is the sequence between borrower ; spouse and lender signing?**  
\>>>> Lender signing will take place after borrower and spouse signing.
4. Why do user need to sign via app? If the intention is to create e-certificate and to do spouse kyc, then make sense. - [Ezha Nafis Aufa Laili](mailto:ezha.laili@gojek.com)
5. Will it be SNI user or gopayplus?
6. [conflict resolution] What if phone number yg dikasih sm bfi udah di link ke nik lain. Tp nik yg dikasih bfi beda. Jadi concept nya dia udah gopay plus dengan nik lain

   1. Follow the current flow - kita kasih gopay account ke digisign - nik kita yang dipake
7. [to ask bfi] Does expiration time of lba between spouse and borrower can be different? Aiming to be the same
8. [to ask goto] Can goto send Spouse’s ktp image and selfie to BFI in order to perform KYC to Spouse?



Further action plan:

1. BFI to get back whether contact customer service is required or not for spouse’s interface - [harry.kurniawan@bfi.co.id](mailto:harry.kurniawan@bfi.co.id)







---



# Variant B



### Flowchart

![](https://feishu.cn/file/Lf42bhwYKoNKcCxmXIdlqR9Ugug)

Please refer to sheet “Fri, 12 september flowchart” [https://app.diagrams.net/#G1Dz1ZOaC8_tFwfhdeZpYv4lU0zVCMbsg-#%7B%22pageId%22%3A%22IMD9cVcbfajlU1pCpgQD%22%7D](https://app.diagrams.net/#G1Dz1ZOaC8_tFwfhdeZpYv4lU0zVCMbsg-#%7B%22pageId%22%3A%22IMD9cVcbfajlU1pCpgQD%22%7D) 



### Requirement (scope: 4W)

#### #1 As MAB, I want to be able to receive final spouse data + spouse LBA in the digisign process from BFI, so that I will be able to use that data for spouse digisign process

1. BFI will send the spouse information on approved callback if spouse signing is required

   1. Spouse information to be shared by bfi:
   
      1. Spouse full name
      2. Spouse phone number
      3. Spouse e-ktp number
      4. Spouse date of birth
      5. Spouse place of birth
      6. Kyc result for spouse data
2. If bfi does not send the spouse signing data, then we can assume that spouse signing is not required
3. For spouse kyc, if the status is passed, then borrower and spouse can go through digisign



1. For spouse kyc, if the status is rejected, then show on borrower UI that spouse signing and borrower signing will be on wet sign.

   1. On spouse app, when spouse open the vf app, the bottom sheet of spouse signing will not be triggered



1. During submission, pass the spouse kyc data to bfi. Use the spouse phone number during the application form for the identifier





#### #2 As a spouse I want to be able to see the LBA signing entrypoint so that i could sign the LBA to help my spouse get the loan



**All requirements below for this #2 user stories, is for kyc passed spouse:**

1. Spouse will be whitelisted automatically for vehicle financing. (based on the phone number that BFI shared on approved callback)
2. Everytime spouse open vf app, show spouse signing bottom sheet

![](https://feishu.cn/file/RAyhba6C1oe0KcxgWEWlZhY0gCg)

1. When bottom sheet spouse signing is closed, then on every page in vf, there will be floating action button. Where if the floating action button is clicked, it will trigger the bottom sheet for spouse signing

   1. Floating action button will be movable by the user to the whole screen



1. There’ll be push notification and whatsapp to remind spouse to do signing:

   1. Reminder when spouse signing is required (send this when we got the spouse data from approved callback):
   
      1. **PN**
      
         1. **Title:** Tandatangan Dulu, Baru Cair!
         2. **Subtitle:** Yuk tandatangan, biar pinjaman pasangan kamu di GoPay Pinjam BPKB bisa cair
      2. **WA**
      
         1. **Content:** TBD
         2. **CTA deeplink:** TBD
   2. Daily reminder for spouse signing starting from D+1 on 10 am from getting approved callback
   
      1. **PN**
      
         1. **Title:** Kamu ditungguin pasangan kamu nih...
         2. **Subtitle:** Pinjaman di GoPay Pinjam BPKB gak bisa cair kalo kamu gak tanda tangan
      2. **WA**
      
         1. **Content:** TBD
         2. **CTA deeplink:** TBD



1. Corner Cases: In situations where BFI assigns one person as the spouse of multiple individuals, the spouse will encounter the entry points in FIFO (first-in, first-out) order.



#### #3 As a borrower, I want to be able to track down digisign status from my spouse, so that I will be able to follow up to my spouse in case they haven’t sign the document yet



**All requirements below for this #3 user stories, is for kyc passed spouse:**

1. On the borrower page, borrower will be able to see the spouse signing status.

   1. Spouse signing status will be: signed and not signed
   2. Show the expiry date as well
   3. Show spouse name and phone number
2. Learn more cta is to direct user to the help center article

![](https://feishu.cn/file/XOxObxAvKoeY6oxfMJClkKg1g7a)



1. Both spouse and borrower signing is required for user to move on to the current loan processing page

![](https://feishu.cn/file/LeLKbE0gnoLpCzx0xazlY95sgVc)

## Goals
- Enable digisign for 4W (CAR) borrowers, including spouse signing when required by BFI.
- Replace the manual (wet sign) LBA signing process for 4W with a seamless in-app digisign flow.
- Unlock 4W top-up eligibility (BFI compliance requires spouse signing).
- Track digisign funnel conversion and signing latency for both borrower and spouse.

## Requirements
- **BFI approved callback extension (Backend):** Receive spouse data (full name, phone number, e-KTP number, date of birth, place of birth) and spouse LBA on the BFI approved callback. If BFI does not send spouse data, spouse signing is not required.
- **Spouse auto-whitelist (Backend):** Automatically whitelist the spouse for vehicle financing based on the phone number BFI shares on the approved callback.
- **Spouse signing entrypoint (Backend → Frontend):** Expose spouse signing info (borrower name hash, loan expiry, signing status) so the spouse app can show a bottom sheet / floating action button entrypoint.
- **Spouse KYC (Backend):** Call OneKYC SDK for the spouse when they click the signing entrypoint. Only allow LBA access after OneKYC passes.
- **Spouse digisign (Backend):** Initiate spouse LBA digisign after KYC passes. Handle spouse digisign callback.
- **Borrower status tracking (Backend → Frontend):** Expose spouse signing status (signed / not signed), expiry date, spouse name and phone number to the borrower.
- **Notifications (Backend):** Send PN and WhatsApp to the spouse when signing is required, plus daily reminders starting D+1 at 10 AM from the approved callback date.
- **Signing sequence:** Borrower and spouse signing can happen in parallel. Lender signing takes place after both borrower and spouse signing are complete.
- **Edge cases:** One spouse correlated to multiple borrowers → FIFO entrypoint ordering. Only 1 spouse per borrower. No spouse data changes once passed to MAB.
- **Scope:** 4W (CAR product type) only. All user groups (DRIVER, CONSUMER, MERCHANT).
- **Rollout:** Percentage rollout to merchant + driver user groups first, then consumer.

## Open Questions
- **BFI callback payload:** What is the exact JSON contract for spouse data in the approved callback? (field names, nesting, whether a separate `isSpouseSigningRequired` flag is sent or inferred from presence of spouse data) — TODO: confirm with BFI.
- **Spouse LBA document:** Does BFI generate a separate LBA document for the spouse, or does the spouse sign the same LBA as the borrower? The PRD says "generate LBA for borrower and spouse" which implies separate documents — TODO: confirm with BFI.
- **Spouse KYC rejected:** PRD says "Wet Sign (outside of the app)" but the backend behavior is unclear. Should the loan fall back to wet sign for both borrower and spouse? — TODO: confirm with PM/BFI.
- **Spouse phone number → gopay account matching:** How is the spouse's phone number matched to a gopay account when the spouse opens the VF app? Is there an existing lookup service? — TODO: confirm with platform team.
- **Spouse digisign partner config:** Does BFI/Digisign provide a separate signature partner for spouse, or is the borrower partner reused? — TODO: confirm with BFI/Digisign.
- **LBA expiration:** Can the expiration time differ between borrower and spouse LBA? PRD says "aiming to be the same" — TODO: confirm with BFI.
- **Spouse KYC in survey:** Can the spouse do KYC during the VD survey instead of in the VF app? — TODO: confirm with Goto/BFI.
- **WA content and CTA deeplink:** PN titles are defined but WhatsApp content and CTA deeplinks are TBD — TODO: confirm with PM.
