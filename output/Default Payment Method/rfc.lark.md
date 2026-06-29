# RFC: **Background**

Status: Draft
Source PRD: output/DEFAULT PAYMENT METHOD/prd.md
Requested Change Scope: TODO: Backend, Frontend, QA, Data / Analytics, Release, or another explicit area.

## Glossary

| Term | Definition |
| --- | --- |
| TODO | TODO: Add term definition. |

## Background

TODO: Summarize why this feature exists and what product outcome it should create. Cover what is being built, why, and why now.

## Product Requirements Summary

Source: output/DEFAULT PAYMENT METHOD/prd.md

# **Background**

Source: https://gotocompany.sg.larksuite.com/docx/KLxndxHSdoV5NbxbrntlWoMogGe

## Background
<title>Mini PRD: Set GoPay Later as Default Payment Method across flows</title>

<table><colgroup><col/><col/></colgroup><tbody><tr><td>Decider</td><td><cite type="user" user-id="ou_d2f4cfecf5ec7544118b83458d157f42" user-name="Andreas Santo Pen"></cite></td></tr><tr><td>Accountable</td><td><cite type="user" user-id="ou_250e0f224c4c807f0042dd66f705173b" user-name="Ignes Olivia"></cite></td></tr><tr><td>Responsible</td><td><ul><li>GPL designer <cite type="user" user-id="ou_b6bed76bcb37715cd99f776528d7ab4a" user-name="Sella Alfathya Winadi"></cite><cite type="user" user-id="ou_ac7ee39371a50a9b5207e794d6d4e004" user-name="Hidayah Yulia Rahma"></cite></li><li>GPL Engagement tech team <cite type="user" user-id="ou_cdfd69cd8a0db2e0a976f633a2113287" user-name="Licco"></cite><cite type="user" user-id="ou_0639906dd38547f44f00aad8fa190117" user-name="Song Xiaoliang"></cite><cite type="user" user-id="ou_c0788f61725ed9dcef6069e1cc97c7f6" user-name="Thomas Putra"></cite><cite type="user" user-id="ou_1ce2e9211f9442a75d848d33c9c8dc7e" user-name="Liem Hindra Sanjaya"></cite></li><li>GoPay PX team <cite type="user" user-id="ou_bc2e050152ab6f92811ec7c58b0a22e6" user-name="Atimas Nurahmad"></cite><cite type="user" user-id="ou_39a350f2d68050825f85a3f360520838" user-name="N K Kiran"></cite></li></ul></td></tr><tr><td>Consulted</td><td><ul><li>Compliance <cite type="user" user-id="ou_74213594de5ee374697a03ff5be55085" user-name="Marcella Chandra Wijayanti"></cite><cite type="user" user-id="ou_53b2eb2c37fa2aeba0336eab44b7cb78" user-name="Ian Stithaprajna"></cite></li><li>Legal <cite type="user" user-id="ou_5c94250894c351ff2c1bd9c45b067274" user-name="Bernadeta Kanya Tyassita"></cite></li><li>Finance <cite type="user" user-id="ou_db7491b11fc59851ab54fee54c5f776e" user-name="TS Womikah Dedy"></cite></li></ul></td></tr><tr><td>Informed</td><td></td></tr></tbody></table>

# **Background**

GoPay Later is enabled in QRIS as per September 2025, starting with CPM. Then the feature is further expanded to MPM ON-US in January, and MPM, CPM, and Online OFF-US in February. As per April, the eligible users are 485k users with 11% adopted users, and 9% monthly adopters. The current 11% adopted users is still considerably low. We need to work on the remaining 432k users that have yet to convert into GPL QRIS MTU.

This PRD entails requirement to encourage users to set GPL as default in few flows such as acquisition, transactions & account management.

# **Sign-offs**

<table><colgroup><col/><col/><col/><col/></colgroup><thead><tr><th><b>No</b></th><th><b>Department</b></th><th><b>Stakeholders</b></th><th><b>Sign-offs date</b></th></tr></thead><tbody><tr><td>1</td><td>Business</td><td><cite type="user" user-id="ou_d2f4cfecf5ec7544118b83458d157f42" user-name="Andreas Santo Pen"></cite><cite type="user" user-id="ou_e2b75b923464b6be1e6fe0ee919fd479" user-name="Ardra Arlizar"></cite></td><td></td></tr><tr><td>2</td><td>Engineering</td><td><cite type="user" user-id="ou_cdfd69cd8a0db2e0a976f633a2113287" user-name="Licco"></cite><cite type="user" user-id="ou_0639906dd38547f44f00aad8fa190117" user-name="Song Xiaoliang"></cite><cite type="user" user-id="ou_1ce2e9211f9442a75d848d33c9c8dc7e" user-name="Liem Hindra Sanjaya"></cite></td><td></td></tr><tr><td>3</td><td>Risk</td><td><cite type="user" user-id="ou_6ca7c77d79ec3cd93477e7434005d71a" user-name="Jay Liu Jie"></cite><cite type="user" user-id="ou_4138fe2653326da39e10cb4e50a3d4ad" user-name="Wen Yuqiu"></cite></td><td></td></tr><tr><td>4</td><td>Legal</td><td><cite type="user" user-id="ou_5c94250894c351ff2c1bd9c45b067274" user-name="Bernadeta Kanya Tyassita"></cite></td><td></td></tr><tr><td>5</td><td>Compliance</td><td><cite type="user" user-id="ou_74213594de5ee374697a03ff5be55085" user-name="Marcella Chandra Wijayanti"></cite><cite type="user" user-id="ou_53b2eb2c37fa2aeba0336eab44b7cb78" user-name="Ian Stithaprajna"></cite></td><td></td></tr><tr><td>6</td><td>Finance</td><td><cite type="user" user-id="ou_360aa60fafb8f4aa7186f2a7b5b523f2" user-name="Anis Fakhri"></cite><cite type="user" user-id="ou_db7491b11fc59851ab54fee54c5f776e" user-name="TS Womikah Dedy"></cite></td><td></td></tr><tr><td>7</td><td>DPPO</td><td><cite type="user" user-id="ou_701e2d1b71781b7688fe0e1755f2a1fb" user-name="Annisa Braza"></cite></td><td></td></tr><tr><td>8</td><td>Collection</td><td><cite type="user" user-id="ou_8d9cd09c55c095276347c1b65aa556ef" user-name="Simon Hung"></cite></td><td></td></tr><tr><td>9</td><td>CS</td><td><cite type="user" user-id="ou_7fd25c22467671abadcd9de86a085c6a" user-name="Miranti"></cite></td><td></td></tr><tr><td>10</td><td>Platform Product</td><td><cite type="user" user-id="ou_da5b5be2b57d4ed1f38029cf6ffb5278" user-name="Li Gaiying"></cite></td><td></td></tr><tr><td>11 </td><td>Platform Engineering</td><td><cite type="user" user-id="ou_57eb37efff0e8b5dcf9cf5fbf2ce53a9" user-name="Chang Xin"></cite><cite type="user" user-id="ou_400670e37f953fdc459eaaa953e5f231" user-name="Peng Wu"></cite></td><td></td></tr><tr><td>12</td><td>Data Engineering</td><td><cite type="user" user-id="ou_b59143b39b6992eae412dde2125866de" user-name="Zhike Chen"></cite></td><td></td></tr></tbody></table>

# **Success Metrics**

- Increase # GPL users who setup GPL as default payment method
- Increase GPL GTV among GPL users who setup GPL as default payment method

# **Scope**

## **In Scope**

- Enable GPL as default method in Acquisition flow Gojek & GoPay app
- Enable GPL as default method in transaction flow Gojek & GoPay app
- Enable GPL as default method in setting page Gojek & GoPay app

## **Out of Scope**

- Enable GPL as default method in Tokopedia

# **Documents**

1. Main PRD <cite doc-id="G3QEdIglmo2ZI9xjLW0lU6V9gKh" file-type="docx" title="PRD: GoPay Later QRIS Post-Launch Product Initiatives (WIP)" type="doc"></cite>
2. Newest figma, owner <cite type="user" user-id="ou_b6bed76bcb37715cd99f776528d7ab4a" user-name="Sella Alfathya Winadi"></cite>

   1. [Flow acquisition & GPL Confirmation nudge](https://www.figma.com/design/DDp9OQlp10osD5XO6hOmOg/-GoPayLater--GPL---Cicil-%E2%80%A2-MAB-Migration?node-id=53817-50162&t=bU00ny82o8e9JXjN-0)
   2. [Settings on Gojek App](https://www.figma.com/design/DDp9OQlp10osD5XO6hOmOg/-GoPayLater--GPL---Cicil-%E2%80%A2-MAB-Migration?node-id=26864-228016&p=f&t=bU00ny82o8e9JXjN-0)
   3. [Settings on GoPay App](https://www.figma.com/design/L7A6Dr1VsbWvo8tBIwvot7/GoPay-Later-Native-v.3?node-id=4154-3141&t=KW5FoDzORbB0nCYu-0)
3. [Strings tracker](https://docs.google.com/spreadsheets/d/1vSF7NHNF8I13qU0BtwrIUESPWjZFhvxjFhJsmVAO8vs/edit?pli=1&gid=1668248875#gid=1668248875&range=4581:4619), owner <cite type="user" user-id="ou_ac7ee39371a50a9b5207e794d6d4e004" user-name="Hidayah Yulia Rahma"></cite>
4. Past PRD: Set GPL as default payment mode in GPL Transaction Flow [PRD](https://docs.google.com/document/d/1Ke8kZKzJLCPnuj3QQTW031Tj812pJ4T8ANZS0AL6qAc/edit?tab=t.0#heading=h.eindk7zc6h9d)
5. Past PRD:Set GPL as default payment method in GPL onboarding [PRD](https://docs.google.com/document/d/11bSgaGCsSEVAgvyZy4Oj-zpfSgRpkkNzv33tXppeX_o/edit?tab=t.0)
6. NPRA 

# **User Story**

# **A. GPL Virgin users**

## User Story 1: Enable default payment method on Acquisition Review Summary Page

As GPL whitelisted virgin users, on onboarding flow, I should be able to see option to opt-in GoPay Later as default payment method on final acquisition review page based on the Treatment version I got.

### **Acceptance Criteria**

<table><colgroup><col/><col/><col/><col/><col/><col/></colgroup><thead><tr><th><b>AC</b></th><th><b>Screen</b></th><th><b>Given</b></th><th><b>When</b></th><th><b>Then</b></th><th><b>Design</b></th></tr></thead><tbody><tr><td>1.1</td><td rowspan="2">Final acquisition review page</td><td>I am GPL whitelisted virgin users under Treatment 1,</td><td>I open acquisition "Review Summary Page",</td><td>I should be able to see "default payment method" banner with toggle off by default, and if I clicked, it should toggle on and this user should has GPL as their default payment method on Gojek &amp; GoPay Apps once this user get their GPL application approved.<grid><column width-ratio="0.500000"><img name="image.png" alt="The image shows two screenshots of the &#34;MAB Activation&#34; page, which is part of the &#34;Review Summary Page&#34; for GPL Virgin users. Both screens display personal information and employment details sections, with fields like gender, email address, occupation, and employer name. At the bottom, there is a green &#34;Submit&#34; button, and a blue &#34;Jadikan metode bayar utama&#34; (Set default payment method) toggle switch, which is highlighted in the right screenshot. This relates to the acceptance criteria where users are nudged to set GPL as the default payment method when clicking the &#34;Submit&#34; CTA." caption="Toggle off&#xA;" crop="[0.000000,0.855000,0.468200,1.000000]" mime="image/png" scale="0.999463" src="XPbAbV6PhowzoVxhScnl1V7kgCd"/></column><column width-ratio="0.500000"><img name="image.png" alt="The image shows two screenshots of the &#34;MAB Activation&#34; page, which is part of the &#34;Review Summary Page&#34; for GPL Virgin users. Both screens display personal information and employment details sections, with fields like gender, email address, occupation, and employer name. At the bottom, there is a green &#34;Submit&#34; button, and a blue &#34;Jadikan metode bayar utama&#34; (Set GoPay Later as default payment method) toggle switch, which is highlighted in the right screenshot. This corresponds to the acceptance criteria where users are nudged to set GPL as default payment method when clicking &#34;Submit&#34; CTA." caption="Toggle on&#xA;" crop="[0.531800,0.850900,1.000000,0.995900]" mime="image/png" scale="0.999463" src="LTonbhPQoowlHlxoG89lIUh3gGb"/></column></grid><br/>Note:<ul><li>If users have toggled on default here, GPL BFF should cached the default logic but only inform GoPay on implementing GPL as default once this user becomes GPL approved user. If this user gets application rejection, then GPL shouldn't be setup as their default method.</li><li>If users have toggled on default on this page, but then drop off from this page and doesn't click CTA "Submit", then GPL BFF doesn't need to cache the toggle &amp; doesn't need to consider that this user setup GPL as default.</li><li>This should applies to all app version, as this is webview page.</li></ul></td><td><img name="image.png" alt="The image shows two screenshots of the &#34;MAB Activation&#34; page, which is part of the &#34;Review Summary Page&#34; for GPL Virgin users. Both screens display personal information and employment details sections, with fields like gender, email address, occupation, and employer name. At the bottom, there is a green &#34;Submit&#34; button, and a blue &#34;Jadikan metode bayar utama&#34; (Set GoPay Later as default payment method) toggle switch, which is highlighted in the right screenshot. This corresponds to the acceptance criteria where users are nudged to set GoPay Later as default payment method when clicking the &#34;Submit&#34; CTA." mime="image/png" scale="1.000000" src="PbPLbrNOpoGj0cxrXH5lQmN6gqh"/></td></tr><tr><td>1.2</td><td>I am GPL whitelisted virgin users under Treatment 2,</td><td>I open acquisition "Review Summary Page",</td><td>I should be able to see usual Review Summary page, and when I clicked "Submit" CTA, I will see bottom sheet nudging me to set GPL as my default payment method.<ul><li>If user clicks "Yes confirm", GPL BFF will cache this user to set GPL as default once they become GPL approved users. CTA will redirect users to next OTP page.</li><li>If user clicks "Maybe Later", GPL BFF will not consider this user to set GPL as default. CTA will redirect users to next OTP page.</li></ul><img name="image.png" alt="The image shows a mobile screen from the &#34;MAB Activation&#34; process, specifically Step 6 of 6. It prompts the user with &#34;Is everything good to go?&#34; and a message to double-check data before submission. Below, there is an illustration of a person holding a phone with various app icons, and the text &#34;Make it your default method? Once activated, GoPay Later will be automatically selected for your transactions.&#34; Two buttons are present: &#34;Maybe later&#34; in green and &#34;Yes, confirm&#34; in green, corresponding to the acceptance criteria described in the context about setting GoPay Later as the default payment method for GPL virgin users." mime="image/png" scale="0.194444" src="Yb48bUsCPo8ejfxNlHWlTculgOd"/><br/>Note:<ul><li>If users have toggled on default here, GPL BFF should cache the default logic but only inform GoPay on implementing GPL as default once this user becomes GPL approved user. If this user gets application rejection, then GPL shouldn't be setup as their default method.</li><li>If users have toggled on default on this page, but then drop off from this page and doesn't click CTA "Submit", then GPL BFF doesn't need to cache the toggle &amp; doesn't need to consider that this user setup GPL as default.</li><li>This should applies to all app version, as this is webview page.</li></ul></td><td><img name="image.png" alt="The image shows two screenshots of the &#34;MAB Activation&#34; page. The left screenshot displays personal information, employment details, and emergency contact fields, with a &#34;Submit&#34; button at the bottom. The right screenshot shows a bottom sheet nudge asking &#34;Make it your default method?&#34; with options &#34;Maybe later&#34; and &#34;Yes, confirm&#34;, and a note that GoPay Later will be automatically selected for transactions once activated. This corresponds to the acceptance criteria for GPL Virgin users, where users see a prompt to set GoPay Later as default when clicking &#34;Submit&#34; on the &#34;Review Summary Page&#34;." mime="image/png" scale="1.000000" src="JWwcbB53xomS5fxckCxlzHSdgkf"/></td></tr></tbody></table>

## User Story 2: Create modulo logic to decide Experiment pool for Final acquisition review page

As GPL Product, I should be able to assign GPL virgin whitelisted users to certain Treatment groups, so that I can see the performance between both groups and conclude which design works best.

Logic:

- Use modulo logic based on Gojek Customer ID, i.e: odd ID will belong to Treatment 1, and even ID will belong to Treatment 2.
- Split 50:50 between Treatment 1 and 2.
- Allow configuration in backend to later rollout from 50% to 100% users based on the performance result.
- Experiment period TBD with Product Analyst, what's the minimum #users required (applied GPL) to conclude the experiment.



*Add toggle off for the whole default feature*

## User Story 3: Enable default payment method on GPL post approval screen after I got GPL approved

As GPL whitelisted users that just got their GPL approved and haven't actively consented GPL to be their default payment method (on user story 1 either Treatment 1 or 2), when I see GPL post-approval screen, I should be encouraged to set GPL as default method again (the default setting is toggled off, users need to click toggle on to activate GPL as method). If users have toggled on this section, regardless of whether they click CTA "Go to homepage" or "Back" button, their default payment method setting should still stand true/ get implemented.

![The image shows a mobile app screen indicating that the GoPay Later account has been activated. It displays a limit of Rp20,000,000 and mentions using it for shopping, trips, and everyday needs. There is a prominent green toggle switch labeled "Set as default payment method" with the text "Make every payment faster & easier" next to it. At the bottom, there is a green "Go to homepage" button, and a note that promo info will be sent via push notifications, WhatsApp, and email, with a mention of managing notifications in "Settings". The app is powered by PT Multifinance Anak Bangsa.](https://feishu.cn/file/PUVIbsbbWoPQf6xxuPElgl4Ogww)

<grid>
<column width-ratio="0.500000">
![The image shows the GoPay Later activation screen. It displays "Your GoPay Later account has been activated!" with a limit of Rp20,000,000. Below, there are icons for shopping, trips, and everyday needs, with a "Set as default payment method" option toggled on. At the bottom, there are two agreements: "Promo info will be sent via push notifications, WhatsApp, and email" and "You agree to Digisign's T&C, Privacy Notice", followed by a "Confirm and continue" button.](https://feishu.cn/file/J0vXboyUWoUNGGxx4Lwl7uD8gtq)
</column>
<column width-ratio="0.500000">
![The image shows a Gojek App screen indicating that the GoPay Later account has been activated. It displays a limit of Rp20,000,000 and mentions using it for shopping, trips, and everyday needs with icons like shopping, food, and travel. There is a toggle switch to set GoPay Later as the default payment method, with a note that this makes payments faster and easier. At the bottom, it states promo info will be sent via push notifications, WhatsApp, and email, and there's a "Go to homepage" button.](https://feishu.cn/file/DE7CbNKGjoC2GbxFAyZlvETPgKv)
</column>
</grid>

<grid>
<column width-ratio="0.500000">
![The image shows the post-approval screen of GoPay Later from the GoPay App (with digisign). The top has a teal banner with "Pendaftaranmu sudah disetujui" (Your registration is approved) and instructions to confirm the limit and agree to the terms. The limit is displayed as Rp20,000,000, with a note it can be used for transactions in Gojek, Tokopedia, and other favorite outlets. There are icons of Gojek, Tokopedia, and other services below. At the bottom, there are two information icons about promo notifications and privacy policy, followed by a green "Konfirmasi dan lanjutkan" (Confirm and continue) button, and a note it is supported by PT Multifinance Anak Bangsa.](https://feishu.cn/file/MIPYbp4Hpow1uqxdF2zliKvCgOh)
</column>
<column width-ratio="0.500000">
![The image shows the post-approval screen of GoPay Later from the Gojek App. It has a blue background with the text "Yey, akunmu udah aktif!" (Yay, your account is active!) at the top. Below, it encourages using GoPay Later for shopping with the limit displayed as "Rp20.000.000" (Rp20,000,000). It mentions it can be used for transactions in Gojek, Tokopedia, and other favorite outlets, with icons of these platforms shown. At the bottom, there's a note about promo info via push notifications, WhatsApp, and email, and a green button labeled "Buka halaman utama" (Open main page).](https://feishu.cn/file/CtpkbieqKoicSEx1NMvlN8GOgzg)
</column>
</grid>

### **Acceptance Criteria**

<table><colgroup><col/><col/><col/><col/><col/><col/></colgroup><thead><tr><th><b>AC</b></th><th><b>Scenario</b></th><th><b>Given</b></th><th><b>When</b></th><th><b>Then</b></th><th><b>New Design (</b><a href="https://www.figma.com/design/DDp9OQlp10osD5XO6hOmOg/-GoPayLater--GPL---Cicil-%E2%80%A2-MAB-Migration?node-id=53983-71876&amp;p=f&amp;t=d4PTt4O7DNq6ho2J-0"><b>Figma</b></a><b>)</b></th></tr></thead><tbody><tr><td>3.1</td><td>GPL users haven't set GPL as default in onboarding review page -&gt; nudge users again in GPL post approval screen</td><td>GPL just approved users haven't set GPL  as default in onboarding review page (either UI on Treatment 1 or 2),</td><td>Users see GPL post approval screen,</td><td>They should see the new version of GPL post approval screen, either in Gojek App or GoPay App. List of changes:<ol><li seq="1">Changes in copy and service type icons</li></ol><grid><column width-ratio="0.450195"><img name="image.png" alt="The image shows the GoPay Later registration confirmation screen. At the top, it states &#34;Pendaftaranmu sudah disetujui&#34; (Your registration is approved) with a confirmation icon. The limit is displayed as &#34;Rp20.000.000&#34; (IDR 20,000,000). It mentions the limit can be used for transactions at Gojek, Tokopedia, and other favorite outlets. There are icons of Gojek, Tokopedia, and other services below. At the bottom, there are two information icons about promo notifications and privacy policy, followed by a green &#34;Konfirmasi dan lanjutkan&#34; (Confirm and continue) button." caption="Old&#xA;" crop="[0.000000,0.498100,1.000000,0.673900]" mime="image/png" scale="1.013889" src="P8dCbSi9po3ZcgxtRHtlRwPWgTd"/></column><column width-ratio="0.549805"><img name="image.png" alt="The image shows the GoPay Later account activation screen. It displays &#34;Your GoPay Later account has been activated!&#34; with a limit of Rp20,000,000. Below, there are icons for shopping, trips, and everyday needs, with a &#34;Set as default payment method&#34; option toggled on. At the bottom, there are two agreements: &#34;Promo info will be sent via push notifications, WhatsApp, and email&#34; and &#34;You agree to Digisign&#39;s T&amp;C, Privacy Notice&#34;, followed by a &#34;Confirm and continue&#34; button." caption="New&#xA;" crop="[0.000000,0.432400,1.000000,0.560000]" mime="image/png" scale="1.013889" src="SXfTbDM9DomRtxxb1MNljLNAgdb"/></column></grid><ol><li>Add GPL default method section, where by default it's toggled off, and users can toggle it on to set GPL as default payment method.</li></ol><grid><column width-ratio="0.545089"><img name="image.png" alt="The image shows a mobile app screen with a blue background. At the top, there is a notification stating &#34;Yey, akunmu udah aktif!&#34; (Your account is active!) and encourages using GoPay Later for shopping needs. Below, the GoPay Later limit is displayed as &#34;Rp20.000.000&#34;. It mentions the limit can be used for transactions in Gojek, Tokopedia, and other favorite outlets, with icons of these platforms shown. At the bottom, there is a green button labeled &#34;Buka halaman utama&#34; (Open main page) and a note about promo info via push notifications, WhatsApp, and email, with &#34;Didukung oleh PT Multifinance Anak Bangsa&#34; (Supported by PT Multifinance Anak Bangsa) mentioned." caption="Old&#xA;" crop="[0.000000,0.525600,1.000000,0.673300]" mime="image/png" scale="1.013889" src="YQU9bnVe8okKBMxhiNmlY0G2g4e"/></column><column width-ratio="0.454911"><img name="image.png" alt="The image shows the GoPay Later account activation screen. It displays &#34;Your GoPay Later account has been activated!&#34; with a limit of Rp20,000,000. Below, there are icons for shopping, trips, and everyday needs, with a &#34;Set as default payment method&#34; option toggled on. At the bottom, there are two agreements: &#34;Promo info will be sent via push notifications, WhatsApp, and email&#34; and &#34;You agree to Digisign&#39;s T&amp;C, Privacy Notice&#34;, followed by a &#34;Confirm and continue&#34; button." caption="New&#xA;" crop="[0.000000,0.518400,1.000000,0.676300]" mime="image/png" scale="1.013889" src="XdWzbHlpfofkhRxV0Nml8OTvgVc"/></column></grid></td><td><grid><column width-ratio="0.500000"><img name="image.png" alt="The image shows the GoPay Later account activation screen. It displays &#34;Your GoPay Later account has been activated!&#34; with a limit of Rp20,000,000. Below, there are icons for shopping, trips, and everyday needs, with a &#34;Set as default payment method&#34; option toggled on. At the bottom, there are two agreements: &#34;Promo info will be sent via push notifications, WhatsApp, and email&#34; and &#34;You agree to Digisign&#39;s T&amp;C, Privacy Notice&#34;, followed by a &#34;Confirm and continue&#34; button." caption="New post approval screen | opened from GoPay App (with digisign)&#xA;" mime="image/png" scale="1.013889" src="RF1wbNUp3oEzGexN8zMlpvohgZd"/></column><column width-ratio="0.500000"><img name="image.png" alt="The image shows a mobile app screen indicating that the GoPay Later account has been activated. It displays a limit of Rp20,000,000 and mentions using it for shopping, trips, and everyday needs. There is a prominent green toggle switch labeled &#34;Set as default payment method&#34; with the text &#34;Make every payment faster &amp; easier&#34; next to it. At the bottom, there is a green &#34;Go to homepage&#34; button. This screen is related to the user story of enabling the default payment method for GPL Virgin users as part of the Mini PRD." caption="New post approval screen | opened from Gojek App (no digisign)&#xA;" mime="image/png" scale="1.013889" src="SfYTbPgrooTbcoxMtyylbyAagqd"/></column></grid></td></tr><tr><td>3.2</td><td>GPL users have set GPL as default in onboarding review page -&gt; hide default toggle</td><td>GPL just approved users have set GPL as default in onboarding review page (either UI on Treatment 1 or 2),</td><td>Users see GPL post approval screen,</td><td>They should see the new version GPL post approval screen, either in Gojek App or GoPay App. List of changes:<ol><li seq="1">Changes in copy and service type icons</li></ol><grid><column width-ratio="0.450195"><img name="image.png" alt="The image shows the GoPay Later registration confirmation screen. At the top, it states &#34;Pendaftaranmu sudah disetujui&#34; (Your registration is approved) with a confirmation icon. The limit is displayed as &#34;Rp20.000.000&#34; (IDR 20,000,000). It mentions the limit can be used for transactions at Gojek, Tokopedia, and other favorite outlets. There are icons of Gojek, Tokopedia, and other services below. At the bottom, there are two information icons about promo notifications and privacy policy, followed by a green &#34;Konfirmasi dan lanjutkan&#34; (Confirm and continue) button." caption="Old&#xA;" crop="[0.000000,0.498100,1.000000,0.673900]" mime="image/png" scale="1.013889" src="L328bUDQLo9DJfxpSOXlZawbgtQ"/></column><column width-ratio="0.549805"><img name="image.png" alt="The image shows the GoPay Later account activation screen. It displays &#34;Your GoPay Later account has been activated!&#34; with a limit of Rp20.000.000. Below, there are icons for shopping, trips, and everyday needs, with a &#34;Set as default payment method&#34; option toggled on. At the bottom, there are two agreements: &#34;Promo info will be sent via push notifications, WhatsApp, and email&#34; and &#34;You agree to Digisign&#39;s T&amp;C, Privacy Notice, and allow us to share your personal data with Digisign to process your e-signature on the Credit Facility Agreement&#34;, and a green &#34;Confirm and continue&#34; button." caption="New&#xA;" crop="[0.000000,0.432400,1.000000,0.560000]" mime="image/png" scale="1.013889" src="W4oDbMJ7ioMLdXxoIaYlgD5XgCh"/></column></grid></td><td><img name="image.png" alt="The image shows two mobile app screens related to GoPay Later account activation. Both screens display the message &#34;Your GoPay Later account has been activated!&#34; with a limit of Rp20,000,000. They mention using it for shopping, trips, and everyday needs, with icons for various categories. The left screen has a green &#34;Go to homepage&#34; button at the bottom, while the right screen has a &#34;Confirm and continue&#34; button. Both screens also note that promo info will be sent via push notifications, WhatsApp, and email, with a note about managing notifications in Settings." caption="Left Gojek App | Right GoPay App&#xA;" mime="image/png" scale="1.000000" src="DfQhbX7yLofK2vxJ0mWlPkZugOb"/></td></tr></tbody></table>

## User Story 4: UX for newly GPL approved users if they already set GPL as default method

As GPL approved users who have setup GPL as default method during onboarding flow, after I got approved, the expected behavior is:

1. I should be able to see GPL being chosen automatically on Payment Widget checkout on both Gojek & GoPay App. For testing, please help to check use-cases such as:

   1. Gojek App
   
      1. ODS: Food, Ride, Car, Send, Mart
      2. QRIS: CPM, MPM, Online
      3. GoTagihan: Bills, Pulsa
   2. GoPay App
   
      1. QRIS: CPM, MPM, Online
      2. Online: one-time redirection
      3. GoTagihan: Bills, Pulsa
2. If I open the default payment setting page on Gojek & GoPay App, I should see GPL chosen as default:

   1. Gojek App
   
      1. Profile - Payment Method - Manage Payment Method - GPL should has "Default" label.
      2. Checkout flow - Payment listing - GPL should has "Default" label.
      3. GPL homepage - click "Setting" icon - "Set as default payment method" should be toggled on
   2. GoPay App
   
      1. Finance Tab - Click GPL section - "Set as default payment method" should be toggled on
      2. GPL homepage - click "Setting" icon - "Set as default payment method" should be toggled on
      3. Checkout flow - Payment listing - GPL should has "Default" label.



# **B. GPL Approved Users**

## User Story 5: Add default method checkbox on GPL confirmation nudge screen

As GPL approved users who haven't added GPL as the default method for any of entry points, when they do GPL transaction and it opens GPL confirmation nudge screen in either GoPay App or Gojek App, they should be able to see checkbox to opt-in GPL as default payment method.

<table><colgroup><col/><col/><col/><col/><col/><col/><col/></colgroup><thead><tr><th vertical-align="middle"><b>AC</b></th><th vertical-align="middle"><b>Service type</b></th><th vertical-align="middle"><b>Scenario</b></th><th vertical-align="middle"><b>List of changes</b></th><th vertical-align="middle"><b>Current design</b></th><th vertical-align="middle"><b>New Design - Gojek App</b></th><th vertical-align="middle"><b>New Design - GoPay App</b></th></tr></thead><tbody><tr><td vertical-align="middle">5.1</td><td rowspan="2">Non recurring:<ul><li>GoTagihan (Bills, Pulsa)</li><li>ODS (Food, Ride, Car, Send, Mart)</li><li>QRIS (MPM, Online)</li></ul></td><td>Non 0% Interest fees</td><td><ol><li seq="1">Add Default toggle UI. By default, the toggle is off. If users click the checkbox, it'll toggle on default. Once users click CTA "Confirm" on this page, GPL BFF should cache this setting that GPL is set as default.</li></ol><img name="image.png" alt="The image shows two mobile payment review screens with a total payment of Rp100,000. Both screens have a confirmation prompt asking to confirm payment with GoPay Later, including a due date of 1 June 2025, installment fee of 2% (Rp2,000), and a checkbox labeled &#34;Set as default method—order anything easier&#34;. The left screen has an unchecked checkbox, while the right screen has a checked checkbox, indicating the default method setting option." crop="[0.000000,0.750200,1.000000,0.870800]" mime="image/png" scale="0.323077" src="WEwEbaXDso7K1SxDJaYlF4ZVgIf"/></td><td><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment with GoPay Later, stating that by confirming, they agree to use it for the transaction. There is a note to check MAB&#39;s loan agreement. The due date is 1 June 2025, the amount to pay is Rp40,000 with an installment fee of 2% (Rp800). At the bottom, there is a green &#34;Confirm&#34; button. This screen is related to the user story of adding a default method checkbox on GPL c, aiming to set GoPay Later as the default payment method across flows." caption="Gojek App&#xA;" crop="[0.000000,0.466600,1.000000,1.000000]" mime="image/png" scale="0.243056" src="TLZVbONUeo6txSxJYGHl9jS0gVg"/></td><td><img name="image.png" alt="The image shows two screenshots of the &#34;Review pembayaran&#34; (Payment Review) page with a total payment of Rp100,000. Both screens have a confirmation prompt asking to &#34;Confirm payment with GoPay Later&#34; and details like due date (1 June 2025), installment fee (2%), and installment fee amount (Rp2,000). The left screen has an unchecked &#34;Set as default method—order anything easier&#34; checkbox, while the right screen has a checked checkbox, indicating the default method has been set." mime="image/png" scale="1.000000" src="Qs5LbXou3oo3mzxQrxglScFHgqc"/></td><td><img name="image.png" alt="The image shows two mobile app screens related to the &#34;Set GoPay Later as Default Payment Method across flows&#34; feature. Both screens have a &#34;Confirm payment with GoPay Later?&#34; message, with a due date of 1 June 2025, a payment amount of Rp23,000, installment fee of Rp460, and an installment fee rate of 2%. The left screen has an unchecked &#34;Set as default method—order anything easier&#34; checkbox, while the right screen has a checked green checkbox, indicating the default method is set. Both screens have a green &#34;Confirm&#34; button at the bottom." mime="image/png" scale="0.177479" src="OVxabNYbzoykPexhVmqlB5UPgib"/></td></tr><tr><td vertical-align="middle">5.2</td><td>0% Interest fees</td><td><ol><li seq="1">Add Default toggle UI. By default, the toggle is off. If users click the checkbox, it'll toggle on default. Once users click CTA "Confirm" on this page, GPL BFF should cache this setting that GPL is set as default.</li></ol><img name="image.png" alt="The image shows two screenshots of the &#34;Review pembayaran&#34; (Payment Review) page with a total payment of Rp100,000. Both screens have a confirmation prompt asking to &#34;Confirm payment with GoPay Later&#34; and details like due date (1 June 2025), installment fee (2%), and installment fee amount (Rp2,000). The left screen has an unchecked &#34;Set as default method—order anything easier&#34; checkbox, while the right screen has a checked checkbox, indicating the default method has been set." crop="[0.000000,0.750200,1.000000,0.870800]" mime="image/png" scale="0.323077" src="BfgWbwBUWorESxxAN9Ilt0sngZd"/><ol><li>Change the due date &amp; interest fees color</li></ol><grid><column width-ratio="0.533430"><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, agreeing to use GoPay Later for the transaction. The due date is 1 June 2023, the amount is Rp10,000, installment fee is 0% (marked &#34;Free&#34;), and the total installment fee is Rp0. A green checkmark icon is present, and there&#39;s a note to check MAB&#39;s loan agreement. At the bottom, a green &#34;Confirm&#34; button is displayed." caption="Current color&#xA;" crop="[0.000000,0.436300,1.000000,0.671800]" mime="image/png" scale="0.960526" src="CxOtbR9uYoq2uhxP6Z8lSG73gKg"/></column><column width-ratio="0.466570"><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, with a note that agreeing uses GoPay Later for the transaction and directs to check the MAB&#39;s loan agreement. The due date is 1 June 2025, the amount to pay is Rp200,000, installment fee is 0% (marked &#34;Gratis&#34;), and there&#39;s a checkbox option &#34;Set as default method—order anything easier&#34; with a green checkmark. A green &#34;Confirm&#34; button is at the bottom." caption="New color&#xA;" crop="[0.000000,0.562500,1.000000,0.769400]" mime="image/png" scale="1.013889" src="UwyWbSCUoo4Hj5xTGcnloGDqg7f"/></column></grid><ol><li>Remove the green banner of 0%</li></ol><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, stating they agree to use GoPay Later for the transaction. The due date is 1 June 2023, the amount is Rp10,000, and the installment fee is Rp0 with &#34;Free&#34; highlighted. There&#39;s a note about checking MAB&#39;s loan agreement. A green &#34;Confirm&#34; button is at the bottom, and a green checkmark icon is on the left." caption="&#xA;" crop="[0.000000,0.668400,1.000000,0.793500]" mime="image/png" scale="0.355263" src="CdcSbrU1Aov7mxx0Rq4lMDojgcc"/></td><td><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, agreeing to use GoPay Later for the transaction. The due date is 1 June 2023, the amount is Rp10,000, installment fee is 0% (marked &#34;Free&#34;), and the total installment fee is Rp0. A green checkmark icon is present, and there&#39;s a note to check MAB&#39;s loan agreement. At the bottom, a green &#34;Confirm&#34; button is displayed." caption="Gojek App&#xA;" mime="image/png" scale="0.250000" src="CYqDbFGtXoUqT7xUG2GlAbk2ggh"/></td><td><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, with a note that agreeing uses GoPay Later for the transaction and directs to check the MAB&#39;s loan agreement. The due date is 1 June 2025, the amount to pay is Rp200,000, installment fee is 0% (marked &#34;Gratis&#34;), and there&#39;s a checkbox &#34;Set as default method—order anything easier&#34; with a green checkmark. A green &#34;Confirm&#34; button is at the bottom." crop="[0.000000,0.192200,1.000000,1.000000]" mime="image/png" scale="0.268050" src="JdB6bzFd5oFhQKx1rbllVC8SgOh"/></td><td><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment with GoPay Later, mentioning they agree to use it for the transaction and directing to check MAB&#39;s loan agreement. The due date is 1 June 2025, the amount to pay is Rp23,000, and the installment fee is Rp0 (Gratis). There is a checkbox labeled &#34;Set as default method—order anything easier&#34; with a green checkmark, and a green &#34;Confirm&#34; button at the bottom. This relates to the context of setting GoPay Later as the default payment method across flows for GPL Approved Users." crop="[0.000000,0.365600,1.000000,1.000000]" mime="image/png" scale="0.258659" src="Lz2cbnvsKo9vQ5x1rgKlMv19gOh"/></td></tr><tr><td vertical-align="middle">5.3</td><td rowspan="2">Non recurring - QRIS CPM</td><td>Non 0% Interest fees</td><td><ol><li seq="1">Add Default toggle UI. By default, the toggle is off. If users click the checkbox, it'll toggle on default. Once users click CTA "Confirm" on this page, GPL BFF should cache this setting that GPL is set as default.</li></ol><img name="image.png" alt="The image shows two mobile payment review screens with a total payment of Rp100,000. Both screens have a confirmation prompt asking to confirm payment with GoPay Later, including a due date of 1 June 2025, installment fee of 2% (Rp2,000), and a checkbox labeled &#34;Set as default method—order anything easier&#34;. The left screen has an unchecked checkbox, while the right screen has a checked checkbox, indicating the default method setting option." crop="[0.000000,0.750200,1.000000,0.870800]" mime="image/png" scale="0.323077" src="Amq8b6wn2osm8qx3vMYlye16gTf"/></td><td><img name="image.png" alt="The image shows a mobile app interface for confirming payment with GoPay Later. At the top, there&#39;s a &#34;GoPay Code&#34; section with a blurred code and a cross icon. Below, a confirmation message states &#34;Confirm payment with GoPay Later?&#34; and explains that agreeing uses GoPay Later for the transaction, with a link to the MAB&#39;s loan agreement. It also shows the due date as 1 Juni 2025 and an installment fee of 2%. At the bottom, there&#39;s a prominent green &#34;Confirm&#34; button. This relates to the context of setting GoPay Later as the default payment method for GPL approved users." mime="image/png" scale="0.174667" src="XoucbPBIRo2xIRxbFhblgUElgkd"/></td><td><img name="image.png" alt="The image shows two mobile app screens related to GoPay Later payment confirmation. Both screens display the &#34;Confirm payment with GoPay Later?&#34; message, agreeing to use GoPay Later for the transaction, and a note to check MAB&#39;s loan agreement. The left screen has an unchecked &#34;Set as default method—order anything easier&#34; checkbox, while the right screen has a checked checkbox with a green checkmark. Below both, there is a green &#34;Confirm&#34; button. The due date is 1 Juni 2025 and the installment fee is 2%." mime="image/png" scale="1.000000" src="MXNtbCpk0oGqBmxKyRrl8O6RgNb"/></td><td><img name="image.png" alt="The image shows two mobile app screens related to the &#34;Pay using Code&#34; feature. On the left, there is a checkbox labeled &#34;Set as default method - order anything easier&#34; which is unchecked. On the right, the same checkbox is checked with a green checkmark. Both screens display the text &#34;Confirm payment with GoPay Later?&#34; and mention a due date of 1 June 2025, an installment fee of 2%, and a green &#34;Confirm&#34; button at the bottom. This visual corresponds to the user story of adding a default method checkbox on GPL c, as part of setting GoPay Later as the default payment method across flows." crop="[0.000000,0.377000,1.000000,1.000000]" mime="image/png" scale="0.193750" src="OHqObdf0DoGf7nxmIM4lNuVUgpe"/></td></tr><tr><td vertical-align="middle">5.4</td><td>0% Interest fees</td><td><ol><li seq="1">Add Default toggle UI. By default, the toggle is off. If users click the checkbox, it'll toggle on default. Once users click CTA "Confirm" on this page, GPL BFF should cache this setting that GPL is set as default.</li></ol><img name="image.png" alt="The image shows two mobile payment review screens with a total payment of Rp100,000. Both screens have a confirmation prompt asking to confirm payment with GoPay Later, including a due date of 1 June 2025, installment fee of 2% (Rp2,000), and a checkbox labeled &#34;Set as default method—order anything easier&#34;. The left screen has an unchecked checkbox, while the right screen has a checked checkbox, indicating the default method setting option." crop="[0.000000,0.750200,1.000000,0.870800]" mime="image/png" scale="0.323077" src="SDCfbIAtSowkv9xDr88ld9pLgEc"/><ol><li>Change the due date &amp; interest fees color</li></ol><grid><column width-ratio="0.533430"><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, agreeing to use GoPay Later for the transaction. The due date is 1 June 2023, the amount is Rp10,000, installment fee is 0% (marked &#34;Free&#34;), and the total installment fee is Rp0. A green checkmark icon is present, and there&#39;s a note to check MAB&#39;s loan agreement. At the bottom, a green &#34;Confirm&#34; button is displayed." caption="Current color&#xA;" crop="[0.000000,0.436300,1.000000,0.671800]" mime="image/png" scale="0.960526" src="IePlbVcsmo62ZTxHgM4lo6QogXg"/></column><column width-ratio="0.466570"><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It prompts the user to confirm payment, with a note that agreeing uses GoPay Later for the transaction and directs to check the MAB&#39;s loan agreement. The due date is 1 June 2025, the amount to pay is Rp200,000, installment fee is 0% (marked &#34;Gratis&#34;), and there&#39;s a checkbox &#34;Set as default method—order anything easier&#34; with a green checkmark. A green &#34;Confirm&#34; button is at the bottom." caption="New color&#xA;" crop="[0.000000,0.562500,1.000000,0.769400]" mime="image/png" scale="1.013889" src="AXPObOvFOojs1yxLYpalmF4egpb"/></column></grid></td><td><img name="image.png" alt="The image shows a mobile interface for confirming payment with GoPay Later. At the top, there&#39;s a prompt asking to confirm payment with GoPay Later, mentioning agreement to use it for the transaction and directing to check the loan agreement. Below, the due date is 1 July 2026, and the installment fee is marked as &#34;Free&#34; with 0%. There are two main buttons: a green &#34;Confirm&#34; button at the bottom and a &#34;Change method&#34; button above it. This interface is related to the user story of adding a default method checkbox on GPL c, as part of setting GoPay Later as the default payment method across flows." crop="[0.000000,0.512900,1.000000,0.950000]" mime="image/png" scale="0.163889" src="EFUIbNt1UoJJ3TxOn10lYtNMgob"/></td><td><em>Need UI from designer</em></td><td><em>Need UI from designer</em></td></tr><tr><td vertical-align="middle">5.5</td><td rowspan="2">Gojek Plus (only in Gojek App)</td><td>Non 0% Interest fees</td><td><ol><li seq="1">Add Default toggle UI. By default, the toggle is off. If users click the checkbox, it'll toggle on default. Once users click CTA "Confirm" on this page, GPL BFF should cache this setting that GPL is set as default.</li></ol><img name="image.png" alt="The image shows two mobile payment review screens with a total payment of Rp100,000. Both screens have a confirmation prompt asking to confirm payment with GoPay Later, including a due date of 1 June 2025, installment fee of 2% (Rp2,000), and a checkbox labeled &#34;Set as default method—order anything easier&#34;. The left screen has an unchecked checkbox, while the right screen has a checked checkbox, indicating the default method setting option." crop="[0.000000,0.750200,1.000000,0.870800]" mime="image/png" scale="0.323077" src="FVxQbPM4ToSFehxNLO8l83plgvu"/><ol><li>Remove grey banner .</li></ol><img name="image.png" alt="The image shows a Gojek Plus payment confirmation screen. At the top, there&#39;s a Gojek Plus logo with the tagline &#34;One plan for guaranteed daily discounts on everything&#34;. Below, a confirmation message asks to confirm payment with GoPay Later, stating the user agrees to use GoPay Later for this transaction and automatic renewal. It mentions checking the MAB loan agreement for more details. The payment amount is Rp18,900 with a 2.00% installment fee of Rp2,000. A note warns to ensure the GoPay Later limit is sufficient for automatic renewal. At the bottom, there&#39;s a green &#34;Konfirmasi&#34; (Confirm) button." caption="Current grey banner nudge&#xA;" crop="[0.000000,0.801500,1.000000,0.908600]" mime="image/png" scale="0.230508" src="LavIbENAkoXrBcxRceblQN0PgRb"/></td><td><img name="image.png" alt="The image shows a Gojek Plus payment confirmation screen. At the top, there&#39;s a Gojek Plus logo with the tagline &#34;One plan for guaranteed daily discounts on everything&#34;. Below, a confirmation message asks to confirm payment with GoPay Later, stating the user agrees to use GoPay Later for this transaction and automatic renewal. It mentions &#34;perjanjian pinjaman MAB&#34; (MAB loan agreement) for more details. The payment amount is Rp18,900 with a 2.00% installment fee of Rp2,000. A note warns to ensure the GoPay Later limit is sufficient for automatic renewal. At the bottom, there&#39;s a green &#34;Konfirmasi&#34; (Confirm) button." mime="image/png" scale="0.125530" src="Hy72bULeEo2jX7xXaLVlysqqggc"/></td><td><img name="image.png" alt="The image shows two screenshots of the GoPay Later payment confirmation interface. Both screens have a green header with &#34;gojek PLUS&#34; and &#34;One plan for guaranteed daily discounts on everything&#34;. The left screen has a checkbox labeled &#34;Jadikan metode utama—pesan apa aja lebih sat set&#34; (Set as default payment method—order anything later set) unchecked, and the right screen has the checkbox checked. Below the checkbox, there is a green &#34;Konfirmasi&#34; button. The left screen shows the payment amount as Rp18,900 with a 2.00% installment fee of Rp2,000, while the right screen has the same payment details." mime="image/png" scale="1.000000" src="DRQNbZl3cotZQlxEIXhlU6fRgp6"/></td><td>N/A</td></tr><tr><td vertical-align="middle">5.6</td><td>0% Interest fees</td><td><ol><li seq="1">Add Default toggle UI. By default, the toggle is off. If users click the checkbox, it'll toggle on default. Once users click CTA "Confirm" on this page, GPL BFF should cache this setting that GPL is set as default.</li></ol><img name="image.png" alt="The image shows two mobile payment review screens with a total payment of Rp100,000. Both screens have a confirmation prompt asking to confirm payment with GoPay Later, including a due date of 1 June 2025, installment fee of 2% (Rp2,000), and a checkbox labeled &#34;Set as default method—order anything easier&#34;. The left screen has an unchecked checkbox, while the right screen has a checked checkbox, indicating the default method setting option." crop="[0.000000,0.750200,1.000000,0.870800]" mime="image/png" scale="0.323077" src="ZuJYbQbj4o26Fjxa9YAlHV5egWc"/><ol><li>Change color for section due date &amp; interest fees</li></ol><grid><column width-ratio="0.554050"><img name="image.png" alt="The image shows a GoPay Later payment confirmation screen. It includes a confirmation message stating &#34;Konfirmasi pembayaran dengan GoPay Later&#34; (Confirm payment with GoPay Later), indicating approval for the transaction and automatic renewal. The due date is 1 June 2024, the amount to pay is Rp18,900, installment fee is 0% (marked as &#34;Gratis&#34;), and the total installment fee is Rp0. There&#39;s a note reminding to ensure the GoPay Later limit is sufficient for automatic renewal. A green &#34;Konfirmasi&#34; (Confirm) button is at the bottom." caption="Current UI&#xA;" crop="[0.000000,0.406800,1.000000,0.593200]" mime="image/png" scale="0.883777" src="ZKxebWz3Bo2gjCxh1HvlulH2gZe"/></column><column width-ratio="0.445950"><img name="image.png" alt="The image shows a Gojek Plus payment confirmation screen for GoPay Later. It includes a checkmark icon, a message confirming GoPay Later usage for the transaction and automatic renewal, and details like a due date of 1 June 2024, installment fee of 0%, and total amount of Rp18,900. A checkbox labeled &#34;Jadikan metode utama—pesan apa aja lebih sat set&#34; (Set as default—order anything later) is highlighted, aligning with the user story to add a default method checkbox for GPL users." caption="New UI&#xA;" crop="[0.000000,0.662900,1.000000,0.840200]" mime="image/png" scale="0.619169" src="ESq4bNMAYodSOXxqKcNlMcvcguf"/></column></grid><ol><li>Remove below banners</li></ol><img name="image.png" alt="The image shows a GoPay Later payment confirmation screen. It includes a confirmation message stating &#34;Konfirmasi pembayaran dengan GoPay Later?&#34; (Confirm payment with GoPay Later?) and mentions agreeing to use GoPay Later for the transaction and automatic renewal. The due date is 1 June 2024, the amount to pay is Rp18,900, installment fee is 0% (marked as &#34;Gratis&#34;), and there&#39;s a note about checking the MAB loan agreement. A green &#34;Konfirmasi&#34; (Confirm) button is at the bottom." crop="[0.000000,0.598400,1.000000,0.830900]" mime="image/png" scale="0.317172" src="CjasbmNu5oVS2LxBUO5lveaGgKg"/></td><td><img name="image.png" alt="The image shows a GoPay Later payment confirmation screen. It includes a confirmation message stating &#34;Konfirmasi pembayaran dengan GoPay Later&#34; (Confirm payment with GoPay Later), indicating approval for the transaction and automatic renewal. The due date is 1 June 2024, the amount to pay is Rp18,900, installment fee is 0% (marked as &#34;Gratis&#34;), and the total installment fee is Rp0. There&#39;s a note reminding to ensure the GoPay Later limit is sufficient for automatic renewal. A green &#34;Konfirmasi&#34; (Confirm) button is at the bottom." mime="image/png" scale="1.000000" src="DXn0bGq2bomECYxO8EQlkochgud"/></td><td><img name="image.png" alt="The image shows a Gojek Plus payment confirmation screen for GoPay Later. It includes a checkmark icon with the text &#34;Konfirmasi pembayaran dengan GoPay Later?&#34; (Confirm payment with GoPay Later?). The screen states that by confirming, the user agrees to use GoPay Later for the transaction and automatic renewal, with a note to check the MAB loan agreement. It shows a due date of 1 June 2024, a payment amount of Rp18,900, installment fee of Rp0, and a checkbox labeled &#34;Jadikan metode utama—pesan apa aja lebih sat set&#34; (Set as the main method—pay anything later). A green &#34;Konfirmasi&#34; (Confirm) button is at the bottom." mime="image/png" scale="0.136556" src="MG0Ob1Fsdoa2epxBZ23laqjagpf"/></td><td>N/A</td></tr></tbody></table>

## User Story 6: GPL approved users who have setup GPL as default shouldn't see GPL default checkbox on GPL confirmation nudge transactions flow

As GPL approved users who have setup GoPay Later as their default payment method, when they transacted using GPL on Gojek & GoPay App and open GPL confirmation nudge screen in every use-case, they should see GPL confirmation nudge screen as it is in production, where there is no checkbox to set GPL as default.

![The image shows the GPL confirmation nudge screen for GPL approved users who have set GoPay Later as their default payment method. It includes a confirmation prompt asking to "Confirm payment with GoPay Later" and stating that agreeing means using GoPay Later for the transaction. There is a note to check MAB's loan agreement. The due date is 1 June 2025, the amount to pay is Rp40,000 with an installment fee of 2% (Rp800), and a green "Confirm" button at the bottom. This screen is as it is in production with no checkbox to set GPL as default.](https://feishu.cn/file/ExpXbCmQCoRqwvxWHyslNorYgNe)

## User Story 7: Cache users' decision on default and implement when transaction has been successful

As GPL users who have toggled on GPL as default on GPL confirmation nudge screen in transaction flow and click "Confirm" CTA, GPL BFF on backend should cache users' preference on GPL as default, and only enabled GPL as default payment method in the next transaction if the transaction goes successfully after users inputted PIN.

## User Story 8: Backward Compatibility handling on GPL Confirmation nudge screen

*A new UI for GPL confirmation screen will be implemented only for Gojek App & GoPay App starting newer app versions.*

As GPL approved users who haven't upgraded the newer Gojek & GoPay App version, when they transacted in Gojek & GoPay App, they should see the current GPL confirmation nudge in production without option to toggle on GPL as default payment method.

## [Edge-case] User Story 9: Handling GPL default in transactions flow if users drop-off or GPL transactions failed

<whiteboard token="KAmzwNjjPhgId0bnNNVlcHa8gAE"></whiteboard>

As GPL approved users who have gone through GPL transactions flow & setup GPL as default payment method via GPL confirmation nudge screen, either in Gojek or GoPay App, if later the GPL transactions failed due to any reasons, then we should not set their GPL as default payment method.

There are different handling based on different scenario:

<table><colgroup><col/><col/><col/><col/><col/></colgroup><thead><tr><th><b>AC</b></th><th><b>Given Scenario</b></th><th><b>When</b></th><th><b>Then</b></th><th><b>Design</b></th></tr></thead><tbody><tr><td>9.1</td><td>GPL Transactions failed due to risk reject reason, either in pre-transactions or loan/ reserve,</td><td><ol><li seq="1">Users clicked checkbox/ toggle GPL as default payment method, and</li><li>Users got risk reject from risk either from pre-transactions or loan/ reserve,</li></ol></td><td>GPL should not be set as default payment method because anyway users' transactions will get blocked due to risk reject.</td><td></td></tr><tr><td>9.2</td><td>GPL transactions failed due to non-risk reject reason, either in pre-transactions or loan/ reserve,</td><td><ol><li seq="1">Users clicked checkbox/ toggle GPL as default payment method, and</li><li>Users got risk reject reasons from non-risk either from pre-transactions or loan/ reserve,</li></ol></td><td>They should get PN mentioning that GPL is failed to be set as default payment method, and when they clicked PN, it should redirects to GPL settings, so that users can set GPL as default payment method.<br/>PN &amp; redirection should be sent to the platform where the GPL transaction happened and failed.<ul><li>If GPL transaction is on Gojek App, PN to be sent in Gojek App &amp; redirects to GPL setting screen on Gojek App (webview).</li><li>If GPL transaction is on GoPay App, PN to be sent in Gojek App &amp; redirects to GPL setting screen on GoPay App (native).</li></ul></td><td><grid><column width-ratio="0.400000"><img name="img_v3_0212a_41f067f9-fe06-4215-837d-e3decaac34hu.png" alt="The image shows a notification from GoPayLater with the text &#34;Atur ulang metode pembayaran utama 🙏&#34;. It states &#34;Maaf, tadi ada gangguan teknis. Klik di sini untuk jadikan GoPay Later metode bayar utama kamu.&#34; which translates to &#34;Sorry, there was a technical issue. Click here to set GoPay Later as your main payment method.&#34; This relates to the context of setting GoPay Later as the default payment method across flows, likely indicating a temporary issue that requires user action to resolve." mime="image/png" scale="0.422764" src="Xorabilsio42BQxcHkLl2FIWgib"/></column><column width-ratio="0.600000"><img name="image.png" alt="The image shows two screenshots of a settings interface. On the left, the &#34;Set as default payment method&#34; option is off, indicated by a gray toggle switch. On the right, the same option is on, with the toggle switch in green. Both screenshots display the &#34;Allow promo notifications&#34; option above, which is also on in the right screenshot. This relates to the context of setting GoPay Later as the default payment method across flows for GPL Approved Users, as mentioned in the document." mime="image/png" scale="0.467949" src="Tq7ZbvM77oRynSxL5WDl6zh3gxg"/></column></grid></td></tr><tr><td>9.3</td><td>Users drop-off in GPL transaction flow, on any screen before entering PIN,</td><td>users don't finish the transactions,</td><td>GPL BFF can stop caching GPL as default method checkbox the moment when users dropoff from one session of the transaction, and GPL shouldn't be set as default payment method.</td><td></td></tr></tbody></table>

# **C. Account Management**

## User Story 10: Add UX to set GPL as default method from GPL homepage

As GPL approved users, I should be able to set GPL as default payment method if I opened GPL Homepage, setting section from Gojek App or GoPay App, and it should reflect the default setting on checkout page on Gojek App & GoPay App real time.

Behavior:

1. If users haven't setup GPL as default payment method from other GoPay entry points, by default the GPL default toggle is off.
2. If users have setup GPL as default payment method from other GoPay entry points, the GPL default toggle will be on.
3. The toggle should be reflected consistently with other default method settings on the GoPay page (Setting screen or GoPay payment Widget).
4. Once users toggle on GPL as default method, their next GPL transactions should be set as default.

<table><colgroup><col/><col/><col/></colgroup><thead><tr><th><b>App Version</b></th><th><b>GoPay App (</b><a href="https://www.figma.com/design/L7A6Dr1VsbWvo8tBIwvot7/GoPay-Later-Native-v.3?node-id=4072-24093&amp;p=f&amp;t=X7To4IXkUMqzz2U6-0"><b>Figma</b></a><b>)</b></th><th><b>Gojek App (</b><a href="https://www.figma.com/design/DDp9OQlp10osD5XO6hOmOg/-GoPayLater--GPL---Cicil-%E2%80%A2-MAB-Migration?node-id=26864-228016&amp;p=f&amp;t=d4PTt4O7DNq6ho2J-0"><b>figma</b></a><b>)</b></th></tr></thead><tbody><tr><td>Newer app version onwards</td><td rowspan="2"><img name="image.png" alt="The image shows three mobile app screens related to GoPay Later settings. The first screen displays GoPay Later details with total limit, primary limit, and QR codes. The second screen is the Settings page with &#34;Allow promo notifications&#34; and &#34;Set as default payment method&#34; options. The third screen shows the &#34;Set as default payment method&#34; option turned on. A blue arrow points from the first screen to the second, indicating the transition to settings. This relates to the user story of adding UX to set GoPay Later as the default payment method across flows." mime="image/png" scale="1.000000" src="F2XubffVEog424xFnQdlRys8gof"/></td><td rowspan="2"><grid><column width-ratio="0.270513"><img name="image.png" alt="The image shows a mobile app interface with a blue header displaying &#34;08:08&#34; and icons. Below, there&#39;s a section showing &#34;Total limit Rp15,000,000&#34;, &#34;Primary limit Rp29,900,900&#34;, and &#34;QRIS limit Rp29,900,900&#34; with &#34;See limit details&#34; option. Four payment app icons (QRIS, GoBills, Indomaret, Alfamart) are below. A green &#34;Activate&#34; button is next to &#34;Need extra cash? Unlock up to 15mio cash loan in GoPay Pinjam!&#34;. At the bottom, &#34;Promos&#34; section has &#34;TIXID - GoPay Later Cashback... Max up to 40k&#34; with a green &#34;View all&#34; button." mime="image/png" scale="1.013889" src="ML6mb575ToWlFnx6MnrlJ408gMc"/></column><column width-ratio="0.364743"><img name="image.png" alt="The image shows a settings screen with two options. The first is &#34;Allow promo notifications&#34; with a description of receiving offers and updates via push notifications, WhatsApp, and email, and a toggle switch on the right. The second is &#34;Set as default payment method&#34; with a description of always using GoPay Later for transactions in Gojek &amp; GoPay app, also with a toggle switch on the right. This relates to the context of adding UX to set GoPay Later as the default payment method across flows in the Gojek App." mime="image/png" scale="1.013889" src="X4rCbKzk7oFG5TxHk14lSXW4g9d"/></column><column width-ratio="0.364743"><img name="image.png" alt="The image shows a settings screen with two options. The first is &#34;Allow promo notifications&#34; with a description of receiving offers and updates via push notifications, WhatsApp, and email, and a green toggle switch. The second is &#34;Set as default payment method&#34; with a description of always using GoPay Later for transactions in Gojek &amp; GoPay app, also with a green toggle switch. This relates to the context of setting GoPay Later as the default payment method across flows in the Gojek App." mime="image/png" scale="1.013889" src="KFh2btT3ropT4ax8jF7lh2F5gHh"/></column></grid></td></tr><tr><td>Older app version onwards</td></tr></tbody></table>

## User Story 11: GPL BFF to fetch GPL users' GPL default method setting from GoPay real-time

As GPL users, I should see real-time & accurate updates of my GPL default payment method status, so that it's consistent with all other screens on Gojek & GoPay App.

## User Story 12: Handling if GPL users had setup other payment methods as default before setting up GPL as default

As GPL users who have setup other payment methods as default before, then actively consent & set GPL as default method either from GPL acquisition flow or GPL setting screen or GPL transactions screen, my next GoPay transactions should be changed to GPL as default.

# **Analytics**

*To discuss with Lisa/ Azka.*

**Acquisition Flow**

<table><colgroup><col/><col/><col/><col/><col/></colgroup><tbody><tr><td>Page</td><td>Event</td><td>Trigger</td><td>Properties</td><td>Purpose</td></tr><tr><td><img name="image.png" alt="The image shows the &#34;MAB Activation&#34; step 6 of 6 screen, which is part of the Acquisition Flow for setting GoPay Later as the default payment method. It includes personal information like gender (Female), email address (idwanula94@gmail.com), and employment details such as occupation (Employee (private)), field of occupation (Transportation), and employer name (PT Mapan Global Recaro). There is a blue button at the bottom with the text &#34;Jadikan metode bayar utama&#34; (Set GoPay Later as the default payment method) and a toggle switch next to it, which is the &#34;Onboarding Approval Default Method Toggle Clicked&#34; event mentioned in the context." mime="image/png" scale="1.000000" src="SH9HbDDRroGmeNx0nlUlCqwtg7g"/></td><td>Onboarding Review Page Viewed</td><td>User lands on the Final Acquisition Review Summary page.</td><td><code>treatment_group</code>: <code>1</code> (Banner) or <code>2</code> (Nudge)<br/><code>app_platform</code>: <code>gojek</code> or <code>gopay</code></td><td>Measures baseline exposure to the experiment.</td></tr><tr><td><img name="image.png" alt="The image shows the &#34;MAB Activation&#34; step 6 of 6 screen, which is part of the Acquisition Flow for setting GoPay Later as the default payment method. It includes personal information like gender (Female), email address (idwanula94@gmail.com), and GoPay Later activation reason (Leisure spending). Employment details are also listed, such as occupation (Employee (private)), field of occupation (Transportation), job position (Supervisor), employer name (PT Mapan Global Recaro), and work address. At the bottom, there is a blue button with the text &#34;Jadikan metode bayar utama&#34; (Set GoPay Later as the default payment method) and a toggle switch, with a green &#34;Submit&#34; button below." mime="image/png" scale="1.000000" src="NxXSboTyNoqxdYxVA9glv2i9gyd"/></td><td>Onboarding Banner Default Method Toggle Clicked</td><td>User toggles the default payment banner under Treatment 1. </td><td><code>action</code>: <code>toggle_on</code> or <code>toggle_off</code></td><td>Tracks explicit intent on the webview banner. </td></tr><tr><td><img name="image.png" alt="The image shows a mobile app screen from the &#34;MAB Activation&#34; process, which is Step 6 of 6. It has a question &#34;Is everything good to go?&#34; with a prompt to double-check data and edits before submission. Below, there&#39;s an illustration of a person holding a phone displaying a GoPay Later icon, with speech bubbles showing &#34;6&#34; and a QR code. The text &#34;Make it your default method? Once activated, GoPay Later will be automatically selected for your transactions&#34; is present. At the bottom, there are two buttons: &#34;Maybe later&#34; (green) and &#34;Yes, confirm&#34; (green). This relates to the context of toggling the default payment method on the activation success page." mime="image/png" scale="1.000000" src="RpVfbYcCpoexLixS7BClAZtigwb"/></td><td>Onboarding Bottom Sheet Triggered</td><td>Bottom sheet triggers after clicking "Submit" under Treatment 2. </td><td><code>app_platform</code>: <code>gojek</code> or <code>gopay</code></td><td>Measures exposure to Treatment 2 modal prompt.</td></tr><tr><td><img name="image.png" alt="The image shows a mobile screen from the MAB Activation process, Step 6 of 6. It has a title &#34;Is everything good to go?&#34; with a prompt to double-check data and edits before submission. Below, there&#39;s an illustration of a person holding a phone displaying a GoPay Later icon, with speech bubbles and a QR code. The text &#34;Make it your default method? Once activated, GoPay Later will be automatically selected for your transactions&#34; is present. At the bottom, there are two buttons: &#34;Maybe later&#34; in green and &#34;Yes, confirm&#34; in green. This relates to the context of toggling the default payment method on the activation success page." mime="image/png" scale="1.000000" src="Wf7hbEHFGoq3vPx0oZSlD4r2gkh"/></td><td>Onboarding Bottom Sheet Button Clicked</td><td>User clicks an option on the Treatment 2 bottom sheet.</td><td><code>cta_clicked</code>: <code>yes_confirm</code> or <code>maybe_later</code>.</td><td>Evaluates conversion differences against the Treatment 1 toggle banner.</td></tr><tr><td><img name="image.png" alt="The image shows the activation success page of a GoPay Later account. It has a blue header with the text &#34;Your GoPay Later account has been activated! Get what you need now, pay later.&#34; Below, it displays &#34;Your limit: Rp20.000.000&#34; and mentions using it for shopping, trips, and everyday needs with icons like shopping bag, car, food, and more. There&#39;s a toggle switch labeled &#34;Set as default payment method&#34; with the purpose &#34;Make every payment faster &amp; easier&#34;. At the bottom, it states promo info via push notifications, WhatsApp, and email, and mentions &#34;Powered by PT Multifinance Anak Bangsa&#34; with a &#34;Go to homepage&#34; button." mime="image/png" scale="1.000000" src="JvGSb9w0ookDXKx2lvtlgi5Rg4g"/></td><td>Onboarding Approval Default Method Success Page</td><td>User lands on the final activation success page.</td><td><code>is_toggle_visible</code>: <code>true</code> (if opted-out earlier) or <code>false</code> (hidden if already opted-in)</td><td>Monitors follow-up surface exposure(). </td></tr><tr><td><img name="image.png" alt="The image shows the activation success page of a GoPay Later account. It has a blue header with the text &#34;Your GoPay Later account has been activated! Get what you need now, pay later.&#34; Below, it displays &#34;Your limit: Rp20.000.000&#34; and mentions using it for shopping, trips, and everyday needs with icons like shopping bag, car, food, and more. There&#39;s a toggle switch labeled &#34;Set as default payment method&#34; with the purpose &#34;Make every payment faster &amp; easier&#34;. At the bottom, it states promo info via push notifications, WhatsApp, and email, and mentions &#34;Powered by PT Multifinance Anak Bangsa&#34; with a &#34;Go to homepage&#34; button." mime="image/png" scale="1.000000" src="PbIgbQk37obpu0xwrJQl1dmog7f"/></td><td>Onboarding Approval Default Method Toggle Clicked</td><td>User toggles the setting on the activation success page.</td><td><code>action</code>: <code>toggle_on</code> or <code>toggle_off</code></td><td>Tracks final post-approval optimization capture.</td></tr></tbody></table>

**Transaction Nudge Flow**

<table><colgroup><col/><col/><col/><col/><col/></colgroup><tbody><tr><td>Page</td><td>Event</td><td>Trigger</td><td>Properties</td><td>Purpose</td></tr><tr><td><img name="image.png" alt="The image shows a payment confirmation sheet for GoPay Later during checkout, as part of the GPL Nudge Flow. It includes a checkbox labeled &#34;Set as default method—order anything easier&#34; with a green checkmark, indicating the user has checked it. The sheet displays the due date as 1 June 2025, the payment amount of Rp10,000 with installment fee 2% (Rp200), and a &#34;Confirm&#34; button at the bottom. There&#39;s a note about agreeing to use GoPay Later for the transaction and a link to MAB&#39;s loan agreement." mime="image/png" scale="1.000000" src="CUfnb31lgoUCFYxKVvHlsHYKgHc"/></td><td>GPL Nudge Shown during transaction</td><td>The GPL confirmation sheet pops up during checkout. </td><td><code>service_type</code>: <code>ODS</code> / <code>QRIS</code> / <code>GoTagihan</code> / <code>GojekPlus</code><br/><code>interest_tier</code>: <code>0_percent</code> or <code>non_0_percent</code> <br/><code>app_platform</code>: <code>gojek</code> or <code>gopay</code></td><td>Evaluates contextual surface conversion rates.</td></tr><tr><td><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It includes a checkmark icon, a message confirming GoPay Later use, a due date of 1 June 2025, a payment amount of Rp10,000 with installment fee Rp200, and a &#34;Set as default method&#34; checkbox (checked) with the text &#34;order anything easier&#34;. There&#39;s a green &#34;Confirm&#34; button at the bottom. This relates to the &#34;GPL Nudge Shown during transaction&#34; event in the document, where the GPL confirmation sheet pops up during checkout." mime="image/png" scale="1.000000" src="Qwp5bwyYkoKRuYxrByOlgKBPgFC"/></td><td>GPL Nudge Default Payment Method Checked</td><td>User clicks the "Set as default method" checkbox/toggle. </td><td><code>action</code>: <code>checked</code> or <code>unchecked</code></td><td>Captures explicit setting changes inline during purchasing.</td></tr><tr><td><img name="image.png" alt="The image shows a payment confirmation screen for GoPay Later. It includes a checkmark icon, a message confirming GoPay Later use for the transaction, a due date of 1 June 2025, a payment amount of Rp10,000 with installment fee Rp200, and a &#34;Set as default method—order anything easier&#34; checkbox (checked). There&#39;s a green &#34;Confirm&#34; button at the bottom. This relates to the &#34;GPL Nudge Shown during transaction&#34; event in the document, where the GPL confirmation sheet pops up during checkout." mime="image/png" scale="1.000000" src="BWP4bLZmKoeAdjxK093lZjBggMe"/></td><td>GPL Payment Processed</td><td>User submits payment PIN and transaction processing finishes. </td><td><code>payment_method</code>: <code>gopay_later</code><br/><code>is_transaction_successful</code>: <code>true</code> or <code>false</code><br/><code>failure_reason</code>: <code>risk_reject</code>, <code>technical_error</code>, or <code>null</code></td><td>Verifies the technical condition required to update the default payment method. </td></tr></tbody></table>

**Account Management & Errors**

<table><colgroup><col/><col/><col/><col/><col/></colgroup><tbody><tr><td>Page</td><td>Event</td><td>Trigger</td><td>Properties</td><td>Purpose</td></tr><tr><td><img name="image.png" alt="The image shows a settings page with two toggle switches. The first toggle is &#34;Aktifkan notifikasi promo&#34; (Enable promo notifications) with a description of getting new offers and products via push notifications, WhatsApp, and email, and it is turned on. The second toggle is &#34;Jadiin metode pembayaran utama&#34; (Set as default payment method) with a description of always using GoPay Later for transactions in the Gojek &amp; GoPay apps, and it is also turned on. This corresponds to the &#34;Default Payment Method Toggled on Settings Page&#34; event in the document, where the user manually flips the toggle inside GPL Settings." mime="image/png" scale="1.000000" src="Z5Btbmp3ooe2jIxxuealyN2IgYg"/></td><td>Default Payment Method Toggled on Settings Page.</td><td>User manually flips the toggle inside GPL Settings. </td><td><code>action</code>: <code>toggle_on</code> or <code>toggle_off</code><br/><code>entry_point</code>: <code>gpl_homepage</code>, <code>profile_page</code> </td><td>Tracks configuration changes outside checkout flows.</td></tr><tr><td><img name="image.png" alt="The image shows a push notification from GoPayLater. The top part has &#34;gopaylater&#34; logo and the text &#34;Atur ulang metode pembayaran utama&#34; with a bell icon. Below, it states &#34;Maaf, tadi ada gangguan teknis. Klik di sini untuk jadikan GoPay Later metode bayar utama kamu.&#34; which means &#34;Sorry, there was a technical issue. Click here to set GoPay Later as your main payment method.&#34; This corresponds to the &#34;Push Notification tapped after a failed transaction&#34; event in the document, where users tap the fallback push notification to re-engage with the settings recovery flow." mime="image/png" scale="1.000000" src="N44pbVzmooptc3xHujYll5FDgHd"/></td><td>Push Notification triggered after a failed transaction.</td><td>Push Notification triggers following a non-risk transaction failure. </td><td><code>app_platform</code>: <code>gojek</code> or <code>gopay</code></td><td>Monitors operational catch-up messaging volume. </td></tr><tr><td><img name="image.png" alt="The image shows a push notification from GoPayLater. The notification has a white background with black text and a blue logo on the left. It reads &#34;Atur ulang metode pembayaran utama&#34; (Reset main payment method) with a warning icon. Below, it states &#34;Maaf, tadi ada gangguan teknis. Klik di sini untuk jadikan GoPay Later metode bayar utama kamu&#34; (Sorry, there was a technical issue. Click here to make GoPay Later your main payment method). This corresponds to the &#34;Push Notification tapped after a failed transaction&#34; event in the document, which measures re-engagement back into the settings recovery flow." mime="image/png" scale="1.000000" src="Q624bxyIyoTH8xxD6hllQlmsgKc"/></td><td>Push Notification tapped after a failed transaction.</td><td>User taps the fallback push notification. </td><td><code>app_platform</code>: <code>gojek</code> or <code>gopay</code></td><td>Measures re-engagement back into the settings recovery flow. </td></tr></tbody></table>

**Business Dashboards**

Dashboard View 1: North Star Impact & Adoption Trends

- **Total Active Default Base:** Count of approved users with GoPay Later set as active default payment method. 
- **Default Adoption Penetration Rate:**

  - $\% \text{ Default Adopters} = \frac{\text{Total GPL Users with GPL as Default}}{\text{Total Approved Active GPL Users}}$.

**ONE TIME ANALYSIS**

- **GTV Lift Delta:** Comparison of average monthly spending per user before vs after configuring GPL as their default payment option
- **Default-Driven GTV Contribution:** Aggregated transaction value (GTV) generated specifically from automated default selections vs manual checkouts.  

Dashboard View 2: Experimentation Framework Panel (Treatment 1 vs Treatment 2)

- **A/B Test Conversion Funnel:**

  - *Step 1:* Onboarding Page Impression count.  
  - *Step 2:* Toggle Opt-In / Confirmation Button click rate.  
  
    - Treatment 1 vs. 2
  - *Step 3:* Final Application Approval count.  
  - *Step 4:* Actual Activation Conversion rate (on system).  
- **Drop-off Analysis:** Measure application bounce volumes where a user toggles "Default On" but quits before pressing "Submit". 

Dashboard View 3: Checkout Nudge Performance

- **Conversion Performance per Service Type:** Conversion performance split by product verticals (ODS vs QRIS vs GoTagihan).    

# **Appendix**

Scenario:

1. Virgin user

   1. toggle gpl as default on onboarding screen (GPL bff cache)
   2. Submit application, in progress
2. Gpl approved - GPL as default: GPL -> GoPay overwrite GPL as default.
3. I set jago as default.
4. Welcome screen - toggle.

Better to get GPL as default on Reserve or Capture? We'll do it during Reserve.

## Goals
- TODO: Confirm product goals.

## Requirements
- TODO: Extract concrete requirements from source PRD.

## Open Questions
- TODO: Confirm ambiguous behavior with PM/design/engineering.

## Current State

TODO: Describe how the relevant parts of the system work TODAY — before any changes from this RFC. Cover which services are involved, the current user/data flow, what does NOT exist, and known limitations.

## Desired State

TODO: Describe what the system looks like AFTER this RFC is fully implemented. Focus on the delta from Current State. Cover what is new, what has changed, and what has been removed or replaced.

## In scope

- TODO: Brief summary of items covered as part of the solution.

## Out of scope

- TODO: Brief summary of items not covered as part of the solution.

## Solution

TODO: Describe the recommended implementation approach. Call out what we will be doing, what we will NOT be doing, and assumptions.

## Implementation Context

TODO: Add repository context before finalizing the RFC. Example:

- Backend: `/path/to/repo-a` owns user APIs and user domain changes.
- Frontend: `/path/to/repo-b` owns settings UI and user-facing copy.
- Shared contracts: `/path/to/repo-c` owns generated API clients or schemas.

## System Design

TODO: Capture services, data flow, sequence, and ownership boundaries.

<whiteboard type="mermaid">
flowchart TD
  PRD[Product requirement] --> RFC[Engineering RFC]
  RFC --> RepoAnalysis[Repository analysis]
  RepoAnalysis --> Design[Proposed design]
  Design --> Implementation[Implementation tasks]
  Implementation --> Rollout[Rollout and validation]
</whiteboard>

## User Story: TODO-001 — [Story Title]

**As** [actor/role], **I want** [goal or capability], **so that** [business benefit].

### Acceptance Criteria

| AC | Given | When | Then |
| --- | --- | --- | --- |
| AC 1.1 | [Precondition] | [Trigger] | [Expected outcome] |
| AC 1.2 | [Precondition] | [Trigger] | [Expected outcome] |

### Technical Approach

#### Approach #1 (Preferred)

- TODO: Overview.
- TODO: Block diagram.
- TODO: Sequence diagram.
- TODO: Database modelling.
- TODO: APIs.
- TODO: Events / Queue changes.

**Pros:** TODO.
**Cons:** TODO.

#### Approach #2

- TODO: Overview.
- TODO: Block diagram.
- TODO: Sequence diagram.
- TODO: Database modelling.
- TODO: APIs.
- TODO: Events / Queue changes.

**Pros:** TODO.
**Cons:** TODO.

## Dependencies

TODO: List prerequisites/dependencies on any team/component before building/rollout.

## Task Breakdown

| ID | Title | Mandays | Type | Team |
| --- | --- | --- | --- | --- |
| 1 | TODO: backend task | 1 | Backend | TODO |
| 2 | TODO: frontend task | 2 | Frontend | TODO |
| 3 | TODO: QA task | 3 | QA | TODO |

## Cross-Cutting Checklist

| # | Concern | Status | Notes |
| --- | --- | --- | --- |
| 1 | **Non-Functional Requirements** — latency SLA, throughput, error rate targets | TODO | TODO |
| 2 | **Security** — authentication, authorisation, data access control | TODO | TODO |
| 3 | **Data Privacy / PII** — new PII fields, data masking, retention policy | TODO | TODO |
| 4 | **Compliance & Regulatory** — applicable regulations, licensing | TODO | TODO |
| 5 | **Risk & Fraud** — new attack surface, fraud rule changes, risk signal impact | TODO | TODO |
| 6 | **Customer Support (CS) Escalation** — new error codes, CS tooling, escalation playbook | TODO | TODO |
| 7 | **Backward Compatibility** — breaking API changes, client migration plan | TODO | TODO |
| 8 | **Feature Flag / Kill Switch** — mechanism to enable/disable safely without redeploy | TODO | TODO |
| 9 | **Observability** — new metrics, dashboards, log events, alerting rules | TODO | TODO |
| 10 | **Rate Limiting & Throttling** — abuse prevention, quota impact on new endpoints | TODO | TODO |
| 11 | **Third-party / External Dependencies** — vendor SLA, fallback if external system is down | TODO | TODO |
| 12 | **Testing Strategy** — unit, integration, E2E, regression, load testing coverage | TODO | TODO |

## Rollout Plan

TODO: Document how this change will be deployed to production safely. Cover feature flag name, rollout phases, targeting criteria, and monitoring gate per phase.

## Rollback Plan (Optional)

TODO: Document how to safely reverse this change. Cover immediate action, step-by-step, user-facing implications, data safety, and who to notify.

## Conclusion

TODO: Jot down the conclusion of the RFC review meeting discussion.

## References

- Links to reference docs
- Link to related PRD, RFCs
- Link to internal documents

## Open questions?

- [ ] Open question 1
  - Resolution for question 1
- [ ] Open question 2
  - Resolution for question 2

## RFC review meeting notes

| Date | Notes |
| --- | --- |
| TODO: date | **Attendees:** TODO: add attendees. **Meeting notes:** TODO: add notes. |

