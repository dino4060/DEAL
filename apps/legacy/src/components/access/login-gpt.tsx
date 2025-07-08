import { Form, Input, Button, Select, Typography, Card, Row, Col } from "antd";

const { Option } = Select;
const { Title, Link } = Typography;

const LoginForm = () => {
    const onFinish = (values: any) => {
        console.log("Form Values:", values);
    };

    return (
        <Card style={{ width: "100%", padding: "2rem" }}>
            <Title level={2} style={{ textAlign: "center" }}>Log in</Title>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                style={{ marginTop: "1rem" }}
            >
                {/* Phone Number */}
                <Form.Item
                    name="phone"
                    label="Phone number"
                    rules={[{ required: true, message: "Please enter your phone number!" }]}
                >
                    <Input
                        addonBefore={
                            <Select defaultValue="VN +84">
                                <Option value="VN +84">VN +84</Option>
                                <Option value="US +1">US +1</Option>
                                <Option value="UK +44">UK +44</Option>
                            </Select>
                        }
                        placeholder="Enter your phone number"
                    />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                {/* Forgot Password Link */}
                <Form.Item>
                    <Link href="#" style={{ float: "right" }}>
                        Forgot the password?
                    </Link>
                </Form.Item>

                {/* Login Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Log in
                    </Button>
                </Form.Item>

                {/* Alternative Login Options */}
                <div style={{ textAlign: "center", margin: "1rem 0" }}>or</div>
                <Form.Item>
                    <Button type="default" block>
                        Log in with TikTok account
                    </Button>
                </Form.Item>

                {/* Sign Up Link */}
                <div style={{ textAlign: "center" }}>
                    Don't have an account yet? <Link href="#">Sign up</Link>
                </div>
            </Form>
        </Card>
    );
};

const App = () => {
    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Row gutter={16} style={{ maxWidth: 900, width: "100%" }}>
                <Col xs={24} md={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                        src="/access/login.svg"
                        alt="Illustration"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <LoginForm />
                </Col>
            </Row>
        </div>
    );
};

export default App;
