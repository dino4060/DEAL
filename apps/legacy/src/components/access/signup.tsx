import { Button, Form, Input } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { Link } from "react-router";
import './style.scss';

const SignupForm = () => {
    const onSubmit = (values: any) => {
        console.log("Form Values:", values);
    };

    return (
        <Form
            name="signup"
            layout="vertical"
            size="large"
            onSubmit={onSubmit}
            style={{ padding: 24, backgroundColor: '#ffffff', borderRadius: 8, width: 480, position: 'relative' }}
        >

            <div style={{ marginTop: 20, display: 'flex', color: '#000', fontWeight: 700, fontFamily: 'TikTokMedium', fontSize: 28, height: 30, }}>
                Sign up as merchant
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-start', fontFamily: 'TikTokFont', height: 20, fontSize: 14, alignItems: 'center', color: '#00000086' }}>
                If have a SShop For Business account ?&nbsp;&nbsp; <Link to="/access/login#" style={{ fontFamily: 'TikTokMedium' }}>Log in</Link>
            </div>

            {/* Phone Number */}
            <Form.Item
                field="username"
                label="Username"
                rules={[{ required: true, message: "You haven't filled out all mandatory fields" }]}
                style={{ marginTop: 24, marginBottom: 0, fontFamily: 'TikTokFont' }}
            >
                <Input placeholder="Enter your username" />
            </Form.Item>

            {/* Password */}
            <Form.Item
                field="password"
                label="Password"
                rules={[{ required: true, message: "You haven't filled out all mandatory fields" }]}
                style={{ marginTop: 24, marginBottom: 0, fontFamily: 'TikTokFont' }}
            >
                <Input.Password placeholder="Enter a password" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item
                style={{ marginTop: 24, marginBottom: 0, fontFamily: 'TikTokFont' }}
            >
                <Button
                    type='primary' status='danger' htmlType="submit" long
                    style={{ color: '#ffffff', fontFamily: 'TikTokMedium', fontSize: 16, margin: '0px 0px', background: '#fe2c55', borderRadius: 4, height: 44 }}
                >
                    Sign up
                </Button>
            </Form.Item>

            {/* Terms and Conditions */}
            <p style={{ margin: '24px 0px 14px 0px', fontSize: 14, display: "block", textAlign: "left", fontFamily: 'TikTokFont', color: '#00000086' }}>
                By continuing, you agree to the <Link to="/access/signup#"> Merchant Terms of Service</Link>,
                <br /><Link to="/access/signup#">SShop Commercial Terms of Service</Link>, and acknowledge that you have read the <Link to="/access/signup#">SShop Partner Privacy Policy</Link>.
            </p>
        </Form>
    );
};

const App = () => {
    return (
        <div style={{
            width: '100%',
            minHeight: "calc(100vh - 60px)",
            backgroundImage: "url('/access/background.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{ display: "flex", justifyContent: "center", height: 'auto', width: 1285, marginLeft: 'auto', marginRight: 'auto', position: 'relative' }} >
                {/* Left Section */}
                <div style={{ maxWidth: 635, marginRight: 64, top: 'unset', marginTop: 'auto', marginBottom: 'auto', position: 'relative' }}>
                    <span
                        style={{ color: "#fff", fontSize: "64px", fontFamily: 'TikTokMedium', lineHeight: '120%', fontWeight: '700' }}>
                        Grow your business with <span style={{ color: 'rgb(235, 37, 76)' }}>SShop</span> today!
                    </span>
                    <p
                        style={{ color: '#fff', fontSize: "18px", fontFamily: 'TikTokFont', lineHeight: '28px', fontWeight: '400', marginTop: "16px 24px 0px 0px" }}>
                        If you are a retailer, brand or business with products to sell, you can sell on SShop with great promotions every month. Let SShop help you boost your business with tons of traffic.
                    </p>
                </div>

                <SignupForm />
                {/* Right Section */}
                {/* <Col xs={24} md={12}>
                    <SignUpForm />
                </Col> */}
            </div>
        </div>
    );
};

export default App;