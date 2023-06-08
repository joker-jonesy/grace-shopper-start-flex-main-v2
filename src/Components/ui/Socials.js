import React from 'react'
import { TwitterIcon, FacebookIcon, MailIcon } from 'lucide-react'



function Socials({ product }) {
    const generateSocials = (product) => {
        return [

            {
                outlet: "Facebook",
                href:
                    `https://www.facebook.com/sharer.php?u=https://stonefort.solutions/products/${product.id}`,
                background: "#3b5898",
                label: "Share on Facebook",
                icon: <FacebookIcon />
            },
            {
                outlet: "Twitter",
                href:
                    `https://twitter.com/intent/tweet?url=https://stonefort.solutions/products/${product.id}`,
                background: "#00aced",
                label: "Share on Twitter",
                icon: <TwitterIcon />
            },
        ];
    }
    return (
        <div className="flex flex-row justify-between">
            {generateSocials(product).map((social, index) => {
                return (
                    <a className={`btn btn-ghost btn-square btn-sm`} aria-label={social.label} key={index + product.id} href={social.href}>
                        {social.icon}
                    </a>
                )
            }
            )}
        </div>
    )
}

export default Socials