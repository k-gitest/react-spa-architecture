import React, { ReactNode } from "react"

const MainWrapper = ({ children }: { children?: ReactNode }) => {
	return (
		<main className="w-full p-4">
			{children}
		</main>
	)
}
export default MainWrapper