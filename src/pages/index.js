import { builder } from '@builder.io/react';
import Image from 'next/image'
import he from 'he';

const BUILDER_IO_API_TOKEN = '7a0bc7cbaed0467c8b704b6722cdd388'

export async function getStaticProps() {
  const users = await builder
    .get('users', {
      apiKey: BUILDER_IO_API_TOKEN, // Ensure you have your Builder.io API key set in the environment
    })
    .toPromise();

    const decodeHtml = (htmlString) => {
      return he.decode(htmlString);
    };

    users.data.freeHtml = decodeHtml(users.data.freeHtml)

  // const res = await fetch('http://localhost:4200/users');
  // const users = await res.json();

  return {
    props: {
      users,
    },
    revalidate: 60 * 15,  // 15 min
  };
}

export default function Home({ users}) {
  return (
    <div>
      <h1>Deployment test</h1>
      {/* <h1>Fetched Data:</h1> */}
      {/* <pre>{JSON.stringify(users.data, null, 2)}</pre> */}
      <h2>{users.data.name}</h2>
      {users.data.pictureList.map((imageRef) => (
        <Image
          src={imageRef.imageFile}
          width={100}
          height={100}
      />
      ))}
      {/* <img height={200} width={200} src={users.data.profilePicture}></img> */}
      <div dangerouslySetInnerHTML={{ __html: users.data.freeHtml }} />

      <a href={users.data.cv} target="_blank" download>Download the pdf</a>

    </div>
  );
}