export default function Question({ text }: { text: string }) {
    return (<div className="mb-4">
        <label className="text-center block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
            {text}
        </label>
    </div>
    )
}