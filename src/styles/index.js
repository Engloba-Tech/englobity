import { font } from './font.styles.js';
import { media, time } from './utils.styles.js';
import { components } from './components.styles.js';
import { createMuiTheme, useTheme } from '@material-ui/core/styles';

export function useEnglobaMaterialTheme(color, globals, fontFamily) {
	const { palette } = useTheme();

	return createMuiTheme({
		font,
		media,
		time,
		palette: { ...palette, ...color },
		typography: {
			fontFamily,
		},
		overrides: {
			MuiCssBaseline: {
				'@global': globals,
			},
			MuiOutlinedInput: {
				...components.inputOutLine,
			},
			MuiInputLabel: {
				...components.inputLabel,
			},
			MuiAutocomplete: {
				...components.autoCompleteInput,
			},
			MuiChip: {
				...components.chips(color),
			},
			MuiAccordion: {
				...components.accordion,
			},
			MuiAppBar: {
				...components.tabs(color),
			},
			MuiTab: {
				...components.tab(color),
			},
		},
	});
}