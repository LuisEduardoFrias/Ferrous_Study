import { createFileRoute } from '@tanstack/react-router'
import ferrous from '../assets/ferrous.gif'
import { FerrisIcon } from '../assets/svgs'
import MarkdownRenderer from "../components/markdown_renderer"
import markdownHomePage from '../markdowns/home_page.md?raw'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-2">
      <img src={ferrous} className="bg-white" alt="ferrous gif" />
      <h1 className="flex gap-1 font-bold -md:text-3xl justify-center items-center">
        Bienvenido a Ferrous Study! <FerrisIcon className="bg-theme-4 rounded-full" />
      </h1>
      <br />
      <MarkdownRenderer>
        {markdownHomePage}
      </MarkdownRenderer>

    </div>
  )
}