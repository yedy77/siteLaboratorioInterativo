import { Box, IconButton, Tooltip, Fab } from "@mui/material";

function Overlay({ resetImages, adjustImages }) {

  return (
    <Box sx={{ position: "absolute", width: '100vw', height: '100vh', top: 0, left: 0, pointerEvents: "none", flexDirection: "column" }}>
      <Box sx={{display: "flex", flexDirection: "column", bottom: 64, right: 64, position: "absolute", gap: 3}}>
        <Tooltip title="adjust images">
          <Fab
            onClick={adjustImages}
            color="primary"
            sx={{
              pointerEvents: "all",
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </Fab>
        </Tooltip>
        <Tooltip title="reset game">
          <Fab
            onClick={resetImages}
            color="primary"
            sx={{
              pointerEvents: "all",
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Overlay;
