// ---------- Utility types ----------

export type NotEmpty<T> = keyof T extends never ? never : T

type AppendToObject<T, U> = {
	[K in keyof U]: U[K] extends
		| string
		| number
		| boolean
		| symbol
		| bigint
		| object
		| Function
		? T & { [P in K]: U[K] }
		: never
}[keyof U]

export type PartialNonEmpty<T> = T extends object
	? { [K in keyof T]: AppendToObject<{}, { [P in K]: T[K] }> }[keyof T]
	: never

/*
	Utility types
-----------------------------------------------------------
	Parameters & Return types
*/

export type HomePageComponentParams = {
	id?: string
}

export type GetRoomsFunctionParams<
	E extends boolean,
	R extends boolean,
	I extends boolean
> = {
	entries: E
	rooms: R
	ids: I
}

export type GetRoomsReturnType<
	E extends boolean,
	R extends boolean,
	I extends boolean
> = E extends true
	? [string, Room][]
	: R extends true
	? Room[]
	: I extends true
	? string[]
	: Record<string, Room>

export type CollectDataCostructorParams = {
	ariaData: string
	title: string
	inputPlaseholder: string
	buttonText: string
	errorText: string
	onSubmit: <T extends string>(text: T) => void
}

export type CollectDataParams = {
	hasNickname: boolean
	hasRoomId: boolean
	toggleTransition: () => void
}

/*
	Parameters & Return types
-----------------------------------------------------------
	User
*/

export type User = {
	name: string
	id: number
	room: number
	is_admin: boolean
	lang: "en" | "ru"
	last_seen: number
}

export type GameUser = User & {
	cards: Card<CardPoints>[]
	points: number
	turn: boolean
}

/*
	User
-----------------------------------------------------------
	Room
*/

export type Room = {
	id: number
	users: User[]
	turn: number
	last_lap: boolean
	waiting: boolean
}

/*
	Room
-----------------------------------------------------------
	Card
*/

type CardWords = "peak" | "spy" | "swap"

type CardPoints = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

type IsRoleCard<T extends CardPoints> = T extends 7 | 8
	? "peak"
	: T extends 9 | 10
	? "spy"
	: T extends 11 | 12
	? "swap"
	: null

export type Card<N extends CardPoints> = {
	points: N
	role: IsRoleCard<N>
	new: boolean
}

type PeakCard = Card<7> | Card<8>
type SpyCard = Card<9> | Card<10>
type SwapCard = Card<11> | Card<12>
type WordCard = PeakCard | SpyCard | SwapCard
type RegularCard =
	| Card<0>
	| Card<1>
	| Card<2>
	| Card<3>
	| Card<4>
	| Card<5>
	| Card<6>
	| Card<13>

type AnyCard = WordCard | RegularCard

/*
	Card
-----------------------------------------------------------
	Game
*/

type GameUseCard = `use_card_${CardWords}`

type GameAction = "use_card" | "pass" | "take_card" | "cabo" | "change_cards"

export type GameActionMessage<A extends GameAction> = {
	user: GameUser
	room: Room
} & (A extends "use_card"
	? { action: GameUseCard; card: WordCard }
	: A extends "pass"
	? { action: "pass" }
	: A extends "take_card"
	? { action: "take_card"; card: AnyCard }
	: A extends "cabo"
	? { action: "cabo" }
	: A extends "change_cards"
	? { action: "change_cards"; cards: AnyCard[] }
	: never)

/*
	Game
-----------------------------------------------------------
	Config (database)
*/

export type SafeObjectPropertyForJSON =
	| string
	| number
	| boolean
	| null
	| Array<any>
	| Record<string, any>

export type Database = {
	users: User[]
	rooms: Record<string, Room>
}
