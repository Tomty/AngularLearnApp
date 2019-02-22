import { trigger, transition, style, query, group, animateChild, animate, keyframes } from '@angular/animations';

export const slider = trigger('routeAnimations', [
	transition('center => isLeft', slideTo('left')),
	transition('center => isRight', slideTo('right')),
	transition('isRight => center', slideTo('left')),
	transition('isLeft => center', slideTo('right'))
]);

function slideTo(direction) {
	const optional = { optional: true };
	return [
		query(
			':enter, :leave',
			[
				style({
					position: 'absolute',
					top: 0,
					[direction]: 0,
					width: '100%'
				})
			],
			optional
		),
		query(':enter', [ style({ [direction]: '-100%', position: 'relative' }) ]),
		group([
			query(':leave', [ animate('700ms ease', style({ [direction]: '150%' })) ], optional),
			query(':enter', [ animate('700ms ease', style({ [direction]: '0%' })) ])
		])
		// Normalize the page style... Might not be necessary

		// Required only if you have child animations on the page
		// query(':leave', animateChild()),
		// query(':enter', animateChild()),
	];
}

function fade() {
	return [
		// Set a default  style for enter and leave
		query(':enter, :leave', [
			style({
				position: 'absolute',
				left: '10px',
				width: '100%',
				opacity: 0,
				transform: 'scale(0) translateY(100%)'
			})
		]),
		// Animate the new page in
		query(':enter', [ animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })) ])
	];
}

export const fader = trigger('routeAnimations', [
	transition('* <=> *', [
		// Set a default  style for enter and leave
		query(':enter, :leave', [
			style({
				position: 'absolute',
				left: 0,
				width: '100%',
				opacity: 0,
				transform: 'scale(0) translateY(100%)'
			})
		]),
		// Animate the new page in
		query(':enter', [ animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })) ])
	])
]);
