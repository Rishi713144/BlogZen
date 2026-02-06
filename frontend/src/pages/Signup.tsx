import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { TubesBackground } from "../components/TubesBackground"

export const Signup = () => {
    return <div>
        <TubesBackground />
        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div>
                <Auth type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
}