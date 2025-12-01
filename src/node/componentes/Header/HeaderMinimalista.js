import Link from "next/link";


export default function HeaderMinimalista(){

    return(
        <header className="w-full min-h-[60px] p-2 pb-2 
        bg-[#00875A] md:p-3.5">
            <Link href={"/"}>
                <img 
                src="/header/Log.png"
                alt=""
                className="w-auto max-w-[140px] mx-auto md:max-w-[175px]"
                />
            </Link>
        </header>
    )
}