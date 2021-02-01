// import Layout from "../../../components/Layout";
// import PageHeader from "../../../components/PageHeader";
// import Footer from "../../../components/Footer";
import UserLayout from "../../src/app/components/other/UserLayout";
import HomePage from "../../src/app/components/home/HomePage";
import AuthRequired from "../../src/app/components/other/AuthRequired";



export default function Home() {
    return (
    <UserLayout pageTitle="Dreamjobpal | Linkedin">
        {/* <PageHeader title="Linkedin Contacts Details" /> */}
        {/* <AuthRequired redirectPath="/homepage" mustAdmin={false}> */}

        <div className="col-md-6 p-3">
            <HomePage/>
        </div>
        {/* </AuthRequired> */}
        {/* <Footer /> */}
    </UserLayout>
    );
}






