/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'

export async function getStaticProps({ params }) {
  console.log(params)
  const { link } = params
  console.log(link)
  const resultado = await clienteAxios.get(`/api/links/${link}`)
  return {
    props: {
      link: resultado.data,
    },
  }
}

export async function getStaticPaths() {
  const links = await clienteAxios.get('/api/links')
  return {
    paths: links.data.links.map(enlace => ({
      params: { link: enlace.url },
    })),
    fallback: false,
  }
}

export default ({ link }) => {
  console.log(link)
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">
        Descarga tu archivo:
      </h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.backendURL}/api/files/${link.file}`}
          className="bg-red-500 text-center px-10 py-3 rounded uppercase fon-bold text-white cursor-pointer"
          download>
          Aquí
        </a>
      </div>
    </Layout>
  )
}
