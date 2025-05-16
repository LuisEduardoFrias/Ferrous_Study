import ferrous from '../assets/ferrous.gif'
import { FerrisIcon } from '../assets/svgs'
import MarkdownRenderer from "../components/markdown_renderer"
import { useTitle } from '../hooks/use_title'
import markdownHomePage from '../markdowns/home_page.md?raw'

export default function Home({ userId }: { userId: string }) {
  useTitle('')
  return (
    <div className="p-2">
      <img src={ferrous} className="bg-[#ffffff] w-full" alt="ferrous gif" />
      <h1 className="flex gap-1 font-bold -md:text-[25px] sm:text-3xl justify-center items-center">
        Bienvenido {userId} a Ferrous Study! <FerrisIcon className="bg-theme-4 rounded-full" />
      </h1>
      <br />
      <MarkdownRenderer>
        {markdownHomePage}
      </MarkdownRenderer>
    </div>
  )
}