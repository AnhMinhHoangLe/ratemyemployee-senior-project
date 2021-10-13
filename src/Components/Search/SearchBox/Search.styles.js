import { Box, InputBase} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// export const SearchComponent = styled('div')(({ theme }) => ({
// 	position: 'relative',
// 	borderColor: alpha('#ffffff', 0.15),
// 	'&:hover': {
// 		borderColor: alpha('#fffff', 0.25),
// 	},
// 	marginRight: theme.spacing(2),
// 	marginLeft: 0,
// 	width: '100%',
// 	[theme.breakpoints.up('sm')]: {
// 	  	marginLeft: theme.spacing(3),
// 	  	width: 300,
// 		borderBottom: '1px solid',
// 	},
// }));
// export const IconContainer = styled(Box)(({ theme }) => ({
// 	padding: theme.spacing(0, 1),
// 	height: '100%',
// 	position: 'absolute',
// 	pointerEvents: 'none',
// 	display: 'flex',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// }));
// export const SearchInput = styled(InputBase)(({ theme }) => ({
// 	    color: 'inherit',
// 		// vertical padding + font size from searchIcon
// 		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// 		transition: theme.transitions.create('width'),
// 		width: '100%',
// 		[theme.breakpoints.up('md')]: {
// 			width: `calc(300- (1em + ${theme.spacing(4)}))`,
// 			border: 'none'
// 		}
// }));
export const SearchComponent = styled('div')(({ theme }) => ({
	position: 'relative',
	// borderRadius: theme.shape.borderRadius,
	// backgroundColor: alpha( theme.palette.common.black, 0.15),
	border: '1px #F0F0F0 solid',
	color:'#869892', 
	'&:hover': {
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
	  marginLeft: theme.spacing(3),
		width: '100%',
		borderRadius:'100px'
	},
  }));
  
export const IconContainer = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 1),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	right: '1%'
	
}));
  
export const SearchInput = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 0, 1, 0),
	  // vertical padding + font size from searchIcon
	  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	  transition: theme.transitions.create('width'),
	  width: '100%',
	  [theme.breakpoints.up('md')]: {
		width: '30ch',
	  },
	},
  }));