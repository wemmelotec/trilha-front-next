import Image from 'next/image'

type ProfileCardProps = {
  name: string
  bio?: string
  image?: string
}

export default function ProfileCard({ name, bio, image }: ProfileCardProps) {
  return (
    <article className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
          {image ? (
            // next/image requires a valid src; using width/height for layout stability
            <Image src={image} alt={`${name} avatar`} width={64} height={64} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg text-gray-500">{name.charAt(0)}</div>
          )}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{name}</h4>
          {bio && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{bio}</p>}
        </div>
      </div>
    </article>
  )
}
